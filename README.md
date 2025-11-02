# SuperClaude Hybrid

**Hybrid configuration utility for using Claude.ai (account-based) and GLM 4.6 (API key) together with SuperClaude Framework**

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

## Quick Start

### Prerequisites

- **SuperClaude Framework** installed ([installation guide](https://github.com/SuperClaude-Org/SuperClaude_Framework))
- **Node.js** 18.0.0 or higher
- **Claude Code** installed ([download here](https://claude.ai/code))

### Installation

```bash
# 1. Install SuperClaude Framework first
pipx install SuperClaude && SuperClaude install

# 2. Clone this repository
git clone https://github.com/therbta/superclaude-hybrid.git
cd superclaude-hybrid

# 3. Install dependencies
npm install

# 4. Configure environment
cp .env.example .env
# Edit .env and add your ZAI_API_KEY

# 5. Initialize and save configuration
npm run setup
npm run save-config
```

### Usage

**Default (Claude.ai - account-based):**
```bash
claude
# Uses your Claude Code account automatically
```

**Switch to GLM 4.6:**
```bash
claude-glm    # Switch to GLM mode
claude        # Start with GLM 4.6
```

**Switch back to Claude.ai:**
```bash
claude-ai     # Switch back to Claude.ai
claude        # Back to Claude.ai
```

**Check status:**
```bash
claude-status
```

---

## Features

- **🔄 Hybrid Provider Switching**: Seamlessly switch between Claude.ai (account) and GLM 4.6 (API key)
- **🔌 SuperClaude Integration**: Works with SuperClaude's PM Agent, Research, and Index plugins
- **📡 MCP Server Support**: Auto-detection of installed MCP servers
- **🛡️ Safe Mode**: No external API calls unless configured
- **🔄 Hot Reload**: Configuration reloading support

---

## Configuration

Edit `superclaude.config.json` to customize:
- Plugin settings (PM Agent, Research, Index)
- MCP server configurations
- Behavioral modes
- Agent orchestration

Environment variables are managed in `.env` file (see `.env.example`).

---

## Scripts

```bash
npm start          # Initialize and detect all components
npm run status     # Show current status
npm run save-config # Save configuration to Claude Code
npm run hot-reload # Reload configuration
```

---

## Files

- `superclaude.config.json` - Main configuration file
- `index.js` - Configuration loader script
- `.env.example` - Environment variables template
- `README.md` - This file
- `LICENSE` - MIT License

---

## Relationship to SuperClaude

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

## Credits

**Created and maintained by [Barış Taskiran (RBT)](https://github.com/therbta)**

### Acknowledgments

- **[SuperClaude Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework)** - This configuration works WITH SuperClaude, not as a replacement
- [Claude Code](https://claude.ai/code) - The IDE integration
- [Z.AI / GLM](https://z.ai) - GLM 4.6 provider support

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Ready to start?** Install SuperClaude Framework first, then follow the Quick Start guide above.