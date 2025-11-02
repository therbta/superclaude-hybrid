#!/usr/bin/env node
/**
 * SuperClaude Hybrid Configuration Loader
 * 
 * Auto-detects installed MCP servers, registers active plugins,
 * and initializes all SuperClaude components.
 * 
 * Created by Barış Taskiran (RBT)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env') });

class SuperClaudeHybrid {
  constructor() {
    this.config = null;
    this.configPath = path.join(__dirname, 'superclaude.config.json');
    this.claudeDir = process.env.CLAUDE_DIR || path.join(os.homedir(), '.claude');
    this.loadConfig();
  }

  /**
   * Load configuration from JSON file
   */
  loadConfig() {
    try {
      const configData = fs.readFileSync(this.configPath, 'utf8');
      this.config = JSON.parse(configData);
      console.log('✓ Configuration loaded from superclaude.config.json');
    } catch (error) {
      console.error('❌ Failed to load configuration:', error.message);
      process.exit(1);
    }
  }

  /**
   * Hot reload configuration
   */
  hotReload() {
    if (process.env.HOT_RELOAD_ENABLED === 'true') {
      console.log('🔄 Hot reloading configuration...');
      this.loadConfig();
      this.detectMCPs();
      console.log('✓ Configuration reloaded');
    }
  }

  /**
   * Auto-detect installed MCP servers
   */
  detectMCPs() {
    const detected = [];
    const mcpServers = this.config.mcp_servers || {};

    for (const [key, server] of Object.entries(mcpServers)) {
      if (server.enabled === false) continue;

      try {
        // Check if command exists (for npx-based servers)
        if (server.command && server.command.includes('npx')) {
          detected.push({
            name: key,
            ...server,
            status: 'available'
          });
        } else if (server.command && server.command.includes('uvx')) {
          // Check for uvx-based servers (like serena)
          try {
            execSync('which uvx', { stdio: 'ignore' });
            detected.push({
              name: key,
              ...server,
              status: 'available'
            });
          } catch {
            detected.push({
              name: key,
              ...server,
              status: 'uv_not_found'
            });
          }
        } else {
          detected.push({
            name: key,
            ...server,
            status: 'unknown'
          });
        }
      } catch (error) {
        detected.push({
          name: key,
          ...server,
          status: 'error',
          error: error.message
        });
      }
    }

    return detected;
  }

  /**
   * Register active plugins
   */
  registerPlugins() {
    const plugins = this.config.plugins || {};
    const activePlugins = [];

    for (const [key, plugin] of Object.entries(plugins)) {
      if (plugin.enabled) {
        activePlugins.push({
          name: key,
          commands: plugin.commands || [],
          settings: plugin.settings || {}
        });
      }
    }

    return activePlugins;
  }

  /**
   * Initialize all components
   */
  async initialize() {
    console.log('🚀 Initializing SuperClaude Hybrid...\n');

    // Check Claude directory
    if (!fs.existsSync(this.claudeDir)) {
      console.log(`⚠️  Claude directory not found: ${this.claudeDir}`);
      console.log('   Creating directory...');
      fs.mkdirSync(this.claudeDir, { recursive: true });
    }

    // Detect MCP servers
    console.log('📡 Detecting MCP servers...');
    const mcpServers = this.detectMCPs();
    mcpServers.forEach(server => {
      const statusIcon = server.status === 'available' ? '✓' : '⚠️';
      console.log(`   ${statusIcon} ${server.name}: ${server.status}`);
    });

    // Register plugins
    console.log('\n🔌 Registering plugins...');
    const plugins = this.registerPlugins();
    plugins.forEach(plugin => {
      console.log(`   ✓ ${plugin.name} (${plugin.commands.length} commands)`);
    });

    // Check behavioral modes
    console.log('\n🎯 Behavioral modes:');
    const modes = this.config.behavioral_modes || {};
    Object.entries(modes).forEach(([key, mode]) => {
      if (mode.enabled) {
        console.log(`   ✓ ${key}: ${mode.description}`);
      }
    });

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✅ SuperClaude Hybrid initialized successfully!');
    console.log('='.repeat(50));
    console.log(`   Active MCP Servers: ${mcpServers.filter(s => s.status === 'available').length}`);
    console.log(`   Active Plugins: ${plugins.length}`);
    console.log(`   Provider: ${this.config.core.provider.default}`);
    console.log(`   Safe Mode: ${this.config.core.safe_mode ? 'enabled' : 'disabled'}`);
    console.log('='.repeat(50) + '\n');

    return {
      mcpServers,
      plugins,
      modes,
      config: this.config
    };
  }

  /**
   * Get configuration for Claude Code
   */
  getClaudeCodeConfig() {
    const provider = process.env.DEFAULT_PROVIDER || this.config.core.provider.default;
    const providerConfig = this.config.core.provider[provider];

    if (provider === 'glm') {
      return {
        env: {
          ANTHROPIC_AUTH_TOKEN: process.env.ZAI_API_KEY || '',
          ANTHROPIC_BASE_URL: providerConfig.base_url,
          API_TIMEOUT_MS: this.config.core.timeout_ms.toString(),
          ANTHROPIC_DEFAULT_OPUS_MODEL: providerConfig.models.opus,
          ANTHROPIC_DEFAULT_SONNET_MODEL: providerConfig.models.sonnet,
          ANTHROPIC_DEFAULT_HAIKU_MODEL: providerConfig.models.haiku
        },
        alwaysThinkingEnabled: false
      };
    } else {
      // Claude.ai - account-based
      return {
        alwaysThinkingEnabled: false
      };
    }
  }

  /**
   * Save configuration to Claude Code settings
   */
  saveClaudeCodeSettings() {
    const settingsPath = path.join(this.claudeDir, 'settings.json');
    const config = this.getClaudeCodeConfig();

    // Backup existing settings
    if (fs.existsSync(settingsPath)) {
      const backupDir = path.join(this.claudeDir, 'config-backups');
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(backupDir, `settings_${timestamp}.json`);
      fs.copyFileSync(settingsPath, backupPath);
      console.log(`✓ Backed up existing settings to: ${backupPath}`);
    }

    // Save new settings
    fs.writeFileSync(settingsPath, JSON.stringify(config, null, 2));
    console.log(`✓ Configuration saved to: ${settingsPath}`);
  }
}

// CLI interface
if (require.main === module) {
  const hybrid = new SuperClaudeHybrid();

  const command = process.argv[2];

  switch (command) {
    case 'init':
      hybrid.initialize().catch(console.error);
      break;
    
    case 'status':
      const status = hybrid.initialize().catch(console.error);
      break;
    
    case 'save-config':
      hybrid.saveClaudeCodeSettings();
      break;
    
    case 'hot-reload':
      hybrid.hotReload();
      break;
    
    default:
      console.log('SuperClaude Hybrid Configuration Loader\n');
      console.log('Usage: node index.js <command>\n');
      console.log('Commands:');
      console.log('  init         - Initialize and detect all components');
      console.log('  status       - Show current status and detected servers');
      console.log('  save-config  - Save configuration to Claude Code settings');
      console.log('  hot-reload   - Reload configuration (if hot-reload enabled)');
      process.exit(1);
  }
}

module.exports = SuperClaudeHybrid;
