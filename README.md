# SuperClaude Hybrid

**A hybrid configuration utility for using Claude.ai (account-based) and GLM 4.6 (API key) together with SuperClaude**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

Created and maintained by [Barış Taskiran (RBT)](https://github.com/therbta)

---

## ⚠️ Important Notice

**This is NOT a replacement for SuperClaude Framework.**

This repository provides a **hybrid configuration system** that allows you to:
- Use **Claude.ai** with your account-based authentication (default)
- Switch to **GLM 4.6** using Z.AI API key when needed
- Seamlessly work with **SuperClaude Framework** plugins and features

**You still need to install SuperClaude Framework separately** - this only provides the configuration layer for hybrid provider usage.

👉 **[Install SuperClaude Framework first](https://github.com/SuperClaude-Org/SuperClaude_Framework)**

---

## 📋 Overview

**SuperClaude Hybrid** is a configuration utility that enables you to use both Claude.ai (account-based) and GLM 4.6 (API key) together with the SuperClaude framework. It provides configuration management, provider switching, and integration with SuperClaude's three main plugin categories — **PM Agent**, **Research**, and **Index**.

### Who is this for?

- Developers who want to **use both Claude.ai and GLM 4.6** in the same workflow
- Teams wanting **seamless switching** between account-based and API-key authentication
- Developers using **SuperClaude Framework** who need hybrid provider support
- Anyone wanting to leverage **cost-effective GLM** for some tasks while keeping **Claude.ai** for complex ones

- Developers using **Claude Code** for AI-assisted coding
- Teams wanting **consistent SuperClaude configurations** across projects
- Developers building **multi-agent orchestration** workflows
- Anyone wanting to leverage **SuperClaude's PM Agent, Research, and Index** plugins together

---

## ✨ Features

### 🎯 Core Capabilities

- **🔄 Hybrid Provider Switching**
  - **Claude.ai**: Default account-based authentication (your Claude Code account)
  - **GLM 4.6**: Switch to Z.AI API when needed for cost-effective coding
  - Seamless configuration management between both providers

- **🔌 SuperClaude Plugins Integration**
  - Works with SuperClaude's **PM Agent**, **Research**, and **Index** plugins
  - Auto-detects installed SuperClaude components
  - Configuration compatibility with SuperClaude Framework
  - **PM Agent**: Project management, planning, and execution with confidence checks
  - **Research**: Deep research with multi-hop reasoning and quality scoring
  - **Index**: Repository indexing with 94% token reduction

- **🤖 Agent Orchestration**
  - Pre-configured specialized agents (Architect, Security, Frontend, Backend, QA, DevOps)
  - Agent chaining and coordination
  - Hot reloading of plugin states

- **🔧 Modular MCP Server Support**
  - Auto-detection of installed MCP servers
  - Configuration for 9+ MCP servers (Sequential Thinking, Context7, Playwright, Chrome DevTools, Tavily, Serena, Magic, Morph, Airis Gateway)
  - Clean config separation with environment variables

- **🎨 Behavioral Modes**
  - Brainstorming, Orchestration, Introspection, Task Management, Deep Research
  - Token Efficiency mode for optimization

- **🔄 Hybrid Provider Support**
  - Seamless switching between Claude.ai (account-based) and GLM 4.6 (API key)
  - Default to Claude.ai, switch to GLM when needed

- **🛡️ Safe Local Execution**
  - No external API calls unless configured
  - Safe mode for development
  - Comprehensive backup system

- **📈 Extensibility**
  - Future-ready for Codex, Gemini, Qwen agents
  - Custom plugin support
  - Easy configuration overrides

---

## 🚀 Installation

### Prerequisites

- **SuperClaude Framework** installed ([installation guide](https://github.com/SuperClaude-Org/SuperClaude_Framework))
- **Node.js** 18.0.0 or higher
- **Claude Code** installed ([download here](https://claude.ai/code))
- **Git** for cloning the repository

### Step-by-Step Setup

#### 0. Install SuperClaude Framework First

**⚠️ IMPORTANT:** You must install SuperClaude Framework before using this configuration.

```bash
pipx install SuperClaude
SuperClaude install
# OR
pip install SuperClaude && SuperClaude install
```

See the [SuperClaude installation guide](https://github.com/SuperClaude-Org/SuperClaude_Framework) for detailed instructions.

#### 1. Clone the Repository

```bash
git clone https://github.com/therbta/superclaude-hybrid.git
cd superclaude-hybrid
```

#### 2. Install Dependencies

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

#### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```bash
# Required for GLM 4.6
ZAI_API_KEY=your_zai_api_key_here

# Optional - for Claude.ai API (uses account auth if not set)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional - for MCP servers that require keys
TAVILY_API_KEY=your_tavily_api_key
TWENTYFIRST_API_KEY=your_21st_dev_api_key
MORPH_API_KEY=your_morph_api_key
```

#### 4. Initialize Configuration

```bash
npm run setup
```

Or manually:

```bash
node index.js init
```

This will:
- ✅ Detect installed MCP servers
- ✅ Register active plugins
- ✅ Check behavioral modes
- ✅ Create necessary directories
- ✅ Validate configuration

#### 5. Save Configuration to Claude Code

```bash
npm run save-config
```

This saves the configuration to `~/.claude/settings.json`.

---

## 📖 Usage Examples

### Basic Usage

#### From Terminal

```bash
# Initialize and detect all components
npm start

# Check current status
npm run status

# Save configuration to Claude Code
npm run save-config

# Hot reload (if enabled)
npm run hot-reload
```

#### In Claude Code

1. Start Claude Code:
   ```bash
   claude
   ```

2. Use SuperClaude commands:
   ```
   /pm              # PM Agent mode
   /research        # Research mode
   /index-repo      # Index repository
   /sc:brainstorm   # Brainstorming mode
   ```

3. Use specialized agents:
   ```
   @agent-architect "review architecture"
   @agent-security "audit code"
   @agent-frontend "build component"
   ```

### Provider Switching

**Default (Claude.ai - account-based):**
```bash
claude
# Uses your Claude Code account automatically
```

**Switch to GLM 4.6:**
```bash
# Make sure ZAI_API_KEY is set in .env
npm run save-config
claude
# Now uses GLM 4.6 with your API key
```

### Programmatic Usage

```javascript
const SuperClaudeHybrid = require('./index.js');

const hybrid = new SuperClaudeHybrid();

// Initialize
await hybrid.initialize();

// Get Claude Code configuration
const config = hybrid.getClaudeCodeConfig();

// Save to Claude Code
hybrid.saveClaudeCodeSettings();

// Hot reload
hybrid.hotReload();
```

### Customization Example

Edit `superclaude.config.json` to customize:

```json
{
  "plugins": {
    "pm_agent": {
      "enabled": true,
      "settings": {
        "confidence_threshold": 0.95
      }
    }
  },
  "mcp_servers": {
    "tavily": {
      "enabled": true,
      "api_key_env": "TAVILY_API_KEY"
    }
  }
}
```

---

## 🔧 Customization

### Adding New Agents

Edit `superclaude.config.json`:

```json
{
  "agents": {
    "your_agent": {
      "enabled": true,
      "description": "Your custom agent description",
      "trigger": "@agent-yourname",
      "capabilities": ["capability1", "capability2"]
    }
  }
}
```

### Overriding Settings

1. **Via Environment Variables**: Set in `.env` file
2. **Via Config File**: Edit `superclaude.config.json`
3. **Via Command Line**: Use environment variables when running

Example:
```bash
DEFAULT_PROVIDER=glm npm start
```

### Custom Plugins

1. Create plugin directory:
   ```bash
   mkdir -p plugins/custom
   ```

2. Add to config:
   ```json
   {
     "extensibility": {
       "custom_plugins": {
         "enabled": true,
         "path": "./plugins/custom"
       }
     }
   }
   ```

### Future Agent Integration

The configuration supports future agents:

```json
{
  "extensibility": {
    "future_agents": {
      "codex": {
        "enabled": true,
        "api_key_env": "CODEX_API_KEY"
      },
      "gemini": {
        "enabled": true,
        "api_key_env": "GEMINI_API_KEY"
      },
      "qwen": {
        "enabled": true,
        "api_key_env": "QWEN_API_KEY"
      }
    }
  }
}
```

---

## 📁 Project Structure

```
superclaude-hybrid/
├── README.md                 # This file
├── LICENSE                  # MIT License
├── .gitignore              # Git ignore rules
├── .env.example            # Environment variables template
├── package.json            # Node.js dependencies
├── superclaude.config.json # Main configuration file
├── index.js                # Configuration loader script
└── README.md               # Documentation
```

---

## 🔍 Configuration Reference

### Core Settings

- **Provider**: `claude` (account) or `glm` (API key)
- **Timeout**: API timeout in milliseconds
- **Safe Mode**: Disable external API calls
- **Hot Reload**: Enable configuration reloading

### Plugins

- **PM Agent**: Project management and planning
- **Research**: Deep research capabilities
- **Index**: Repository indexing

### MCP Servers

- **Sequential Thinking**: Multi-step reasoning
- **Context7**: Documentation lookup
- **Playwright**: E2E testing
- **Chrome DevTools**: Debugging
- **Tavily**: Web search (requires API key)
- **Serena**: Code analysis (requires uv)
- **Magic**: UI components (requires API key)
- **Morph**: Code modifications (requires API key)
- **Airis Gateway**: Dynamic tool loading

---

## 🛠️ Troubleshooting

### MCP Servers Not Detected

```bash
# Check if npx is available
which npx

# Check if uv is available (for Serena)
which uv
which uvx
```

### Configuration Not Loading

```bash
# Verify config file exists
ls -la superclaude.config.json

# Check JSON validity
node -e "console.log(JSON.parse(require('fs').readFileSync('superclaude.config.json')))"
```

### Environment Variables Not Found

```bash
# Verify .env file exists
ls -la .env

# Check if dotenv is loading
node -e "require('dotenv').config(); console.log(process.env.ZAI_API_KEY)"
```

### Claude Code Not Recognizing Config

```bash
# Verify settings saved
cat ~/.claude/settings.json

# Restart Claude Code
claude
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

**Created and maintained by [Barış Taskiran (RBT)](https://github.com/therbta)**

### Acknowledgments

- **[SuperClaude Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework)** - This configuration works WITH SuperClaude, not as a replacement. All plugin functionality comes from the official SuperClaude Framework.
- [Claude Code](https://claude.ai/code) - The IDE integration
- [Z.AI / GLM](https://z.ai) - GLM 4.6 provider support
- All contributors to the SuperClaude ecosystem

### Relationship to SuperClaude

- ✅ **This repo**: Configuration utility for hybrid provider usage
- ✅ **SuperClaude Framework**: The actual framework with plugins, agents, and features
- ✅ **Together**: Enables switching between Claude.ai (account) and GLM 4.6 (API) while using SuperClaude

---

## 📚 Additional Resources

### Essential Reading

- **[SuperClaude Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework)** - The main framework (install this first!)
- [SuperClaude Installation Guide](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/docs/getting-started/installation.md)
- [Claude Code Documentation](https://docs.claude.ai/code)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)

### Understanding the Relationship

```
SuperClaude Framework (required)
    ↓
Provides: PM Agent, Research, Index plugins
    ↓
SuperClaude Hybrid (this repo)
    ↓
Adds: Hybrid provider switching (Claude.ai ↔ GLM 4.6)
```

**You need SuperClaude Framework for the plugins. This repo only adds hybrid provider support.**

---

## 🚦 Quick Start Checklist

- [ ] **Install SuperClaude Framework first** (`pipx install SuperClaude && SuperClaude install`)
- [ ] Clone this repository
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Add your GLM API key (ZAI_API_KEY) to `.env`
- [ ] Run `npm run setup`
- [ ] Run `npm run save-config`
- [ ] Start Claude Code with `claude` (defaults to Claude.ai)
- [ ] Use `claude-glm` to switch to GLM 4.6 when needed
- [ ] Try SuperClaude commands: `/pm`, `/research`, or `/index-repo`

**Remember:** SuperClaude Framework provides the plugins. This repo just adds hybrid provider switching.

---

**Ready to start?** Clone the repo and follow the installation steps above!

For questions or issues, please open an issue on GitHub.
