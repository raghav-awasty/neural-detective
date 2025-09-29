# 🚀 Quick Start Guide - Neural Detective

## 📁 Repository Structure

This is a complete, self-contained repository for the Neural Detective action potential simulation activity.

```
neural-detective/
├── 📄 Documentation
│   ├── README.md                    # Main project overview
│   ├── STUDENT_HANDOUT.md           # Complete student guide
│   ├── TEACHER_GUIDE.md             # Comprehensive educator guide
│   ├── INTERFACE_FIXES.md           # Recent UI improvements
│   ├── PROJECT_SUMMARY.md           # Development summary
│   ├── ActionPotential.md           # Original concept
│   └── QUICK_START.md               # This file
│
├── 🌐 Web Application
│   ├── src/index.html               # Main application
│   ├── public/css/styles.css        # Styling
│   └── public/js/                   # JavaScript files
│       ├── neuron-simulator.js      # Simulation engine
│       └── app.js                   # User interface
│
├── 📊 Data & Configuration
│   └── data/                        # Case study configurations
│       ├── case_a.json             # High threshold case
│       ├── case_b.json             # Low threshold case
│       ├── case_c.json             # Poor reset case
│       ├── case_d.json             # Weak stimulus case
│       └── case_normal.json        # Normal control
│
├── 🐍 Python Tools
│   ├── scripts/action_potential_simulator.py  # Advanced CLI tool
│   └── requirements.txt            # Python dependencies
│
└── 🔧 Development
    ├── .github/workflows/          # CI/CD automation
    ├── .gitignore                  # Git ignore rules
    └── LICENSE                     # MIT License
```

## ⚡ Instant Setup (30 seconds)

### For Students & Teachers:
1. **Double-click `src/index.html`** to open in your web browser
2. **Select a patient case** from the dropdown menu
3. **Click "Run Investigation"** to start simulating!
4. **Use "Reveal Diagnosis"** to check your findings

That's it! No installation required.

## 🎯 What Each Case Does

| Case | Problem | What You'll See |
|------|---------|----------------|
| **Case A** | Too high threshold | Voltage climbs but never spikes |
| **Case B** | Too low threshold | Spikes almost every step |
| **Case C** | Poor reset | Irregular spike patterns |
| **Case D** | Weak stimulus | Very few spikes |
| **Normal** | Healthy baseline | Regular, normal spiking |

## 🐍 Advanced Python Setup (Optional)

For educators who want advanced features:

```bash
# Install Python requirements
pip install -r requirements.txt

# Run advanced simulator
python scripts/action_potential_simulator.py --help

# Example: Run all cases with plots
python scripts/action_potential_simulator.py --all --plot --report
```

## 📚 Educational Materials

- **`STUDENT_HANDOUT.md`**: Complete investigation protocols and worksheets
- **`TEACHER_GUIDE.md`**: Implementation strategies, timing, and assessment rubrics
- **Case Files (`data/*.json`)**: Easily customizable neuron parameters

## 🎨 Recent Improvements

✅ **Fixed chart stretching issues**
✅ **Improved text readability**
✅ **Enhanced simulation log formatting**
✅ **Better parameter display**
✅ **Professional interface design**

See `INTERFACE_FIXES.md` for detailed information about recent UI improvements.

## 🌟 Key Features

- **Interactive Web Interface**: Works on any modern browser
- **Real-time Visualization**: Charts show voltage traces over time
- **Diagnostic System**: Built-in analysis to verify student findings
- **Progressive Learning**: Students form hypotheses before seeing answers
- **Cross-Platform**: Windows, Mac, Linux, tablets, phones

## 🔧 Customization

### Adding New Cases:
1. Create a new JSON file in the `data/` folder
2. Follow the existing format (see `case_a.json` for example)
3. The interface will automatically detect new cases

### Modifying Existing Cases:
1. Edit the JSON files in `data/` folder
2. Change parameters like threshold, reset voltage, stimulus strength
3. Update descriptions and biological context as needed

## 🎓 Educational Standards Alignment

This activity supports:
- **Biology**: Cell membrane function, electrical signaling, nervous system
- **Computer Science**: Computational modeling, data analysis, debugging
- **Science Practices**: Hypothesis formation, data interpretation, evidence-based reasoning

## 📞 Support

- Check `TEACHER_GUIDE.md` for troubleshooting
- Review `README.md` for detailed documentation
- All files are self-contained - no internet required (except for some fonts/icons)

## 🏆 Ready to Use!

This repository contains everything needed for a complete educational experience:
- ✅ Interactive web application
- ✅ Comprehensive documentation
- ✅ Assessment materials
- ✅ Extension activities
- ✅ Technical support resources

**Happy investigating, Neural Detectives!** 🧠⚡️