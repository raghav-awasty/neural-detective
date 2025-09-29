# ⚡️ Neural Detective: The Broken Circuit

An interactive educational activity that combines biology and computer science to teach action potential concepts through simulation and diagnosis of "faulty" neurons.

## 🎯 Overview

Neural Detective is a cross-curricular activity where students act as neuroscientists investigating patients with neurological symptoms. By running computational simulations and analyzing results, students learn about action potentials, neuronal dysfunction, and the scientific method.

### Key Features
- **Interactive Web Interface**: Easy-to-use simulation with real-time charts
- **Multiple Case Studies**: Four distinct neuronal dysfunctions plus normal control
- **Progressive Difficulty**: Scaffolded learning from basic to advanced concepts
- **Automated Diagnosis**: Built-in expert system to verify student findings
- **Cross-Platform**: Works on any modern web browser

## 🚀 Quick Start

### For Educators
1. Download or clone this repository
2. Open `src/index.html` in a web browser
3. Test each case to familiarize yourself with the interface
4. Review the `TEACHER_GUIDE.md` for implementation strategies
5. Print `STUDENT_HANDOUT.md` for reference (optional)

### For Students
1. Open the web interface
2. Select a patient case to investigate
3. Run simulations and observe the results
4. Form hypotheses about what's wrong
5. Use the diagnosis feature to check your work

## 📁 Project Structure

```
NM_CC/
├── src/
│   └── index.html              # Main web interface
├── public/
│   ├── css/
│   │   └── styles.css          # Interface styling
│   └── js/
│       ├── neuron-simulator.js # Simulation engine
│       └── app.js              # User interface logic
├── data/
│   ├── case_a.json            # High threshold case
│   ├── case_b.json            # Low threshold case  
│   ├── case_c.json            # Poor reset case
│   ├── case_d.json            # Weak stimulus case
│   └── case_normal.json       # Normal control
├── scripts/
│   └── action_potential_simulator.py  # Advanced Python version
├── .github/
│   └── workflows/             # CI/CD automation
├── ActionPotential.md         # Original activity description
├── STUDENT_HANDOUT.md         # Student instructions
├── TEACHER_GUIDE.md           # Educator implementation guide
└── README.md                  # This file
```

## 🎓 Educational Objectives

Students will learn to:
- Explain the mechanism of action potentials
- Analyze how parameters affect neuronal firing
- Diagnose neuronal dysfunction systematically
- Connect computational models to biological reality
- Practice scientific method and hypothesis testing

## 🔬 The Cases

### Case A: High Threshold
**Symptoms**: Complete loss of reflexes
**Challenge**: Why won't this neuron fire?

### Case B: Hyperexcitability  
**Symptoms**: Seizure-like activity
**Challenge**: Why does this neuron fire too much?

### Case C: Poor Reset
**Symptoms**: Abnormal reflex patterns
**Challenge**: Why won't this neuron reset properly?

### Case D: Weak Input
**Symptoms**: Reduced sensory responses
**Challenge**: Why is this neuron so insensitive?

### Normal Control
**Reference**: Healthy neuron for comparison

## 💻 Technical Requirements

### Web Interface
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Internet connection for external libraries (Chart.js, Font Awesome)

### Python Interface (Optional Advanced Tool)
- Python 3.7+
- Required packages: `matplotlib`, `numpy`
- Command line access

## 🛠️ Setup Instructions

### Simple Setup (Recommended)
1. Download all files to a folder
2. Double-click `src/index.html` to open in browser
3. Begin investigation!

### Advanced Setup (Local Server)
For better performance and full features:

```bash
# Navigate to project directory
cd path/to/NM_CC

# Start local server (Python)
python -m http.server 8000

# Open browser to:
http://localhost:8000/src/index.html
```

### Python Command Line Tool
```bash
# Install dependencies
pip install matplotlib numpy

# Run simulator
cd scripts
python action_potential_simulator.py --help

# Example usage
python action_potential_simulator.py --case "Case A" --steps 20 --plot
```

## 📖 Usage Examples

### Basic Investigation
1. Select "Case A" from dropdown
2. Click "Run Investigation"  
3. Observe voltage chart and spike analysis
4. Form hypothesis about the problem
5. Click "Reveal Diagnosis" to check

### Advanced Analysis
```bash
# Run all cases with visualization
python action_potential_simulator.py --all --plot --report

# Compare specific cases
python action_potential_simulator.py --case "Case A" --steps 50 --plot

# Generate detailed reports
python action_potential_simulator.py --all --report
```

## 🎯 Learning Objectives Alignment

### Biology Standards
- Cell membrane structure and function
- Nervous system organization
- Electrical signaling in cells
- Homeostasis and regulation

### Computer Science Standards  
- Computational modeling
- Data analysis and visualization
- Pattern recognition
- Debugging and troubleshooting

### Science Practices
- Scientific method
- Hypothesis formation and testing
- Data interpretation
- Evidence-based reasoning

## 🔧 Customization

### Adding New Cases
1. Create JSON file in `data/` directory following existing format
2. Add case configuration to JavaScript CASE_CONFIGS object
3. Test new case in interface

### Modifying Parameters
Edit the JSON files in `data/` directory to adjust:
- Threshold voltages
- Reset voltages  
- Stimulus strengths
- Biological context descriptions

### Interface Customization
- Modify `public/css/styles.css` for visual changes
- Edit `public/js/app.js` for functionality changes
- Update `src/index.html` for content changes

## 📊 Assessment Options

### Formative Assessment
- Real-time observation of student progress
- Hypothesis formation and testing
- Peer explanations and discussions

### Summative Assessment
- Case investigation reports
- Comparative analysis projects
- Custom case design challenges

See `TEACHER_GUIDE.md` for detailed rubrics and assessment strategies.

## 🤝 Contributing

We welcome contributions! Please consider:
- Additional case studies
- Interface improvements
- Documentation enhancements
- Bug fixes and optimizations

## 📝 License

This educational resource is provided for educational use. Please see individual file headers for specific licensing information.

## 🙏 Acknowledgments

- Original concept based on computational neuroscience principles
- Built with Chart.js for data visualization
- Font Awesome for icons
- Inspired by real neuroscience research and education needs

## 📞 Support

For questions, issues, or suggestions:
1. Check the `TEACHER_GUIDE.md` troubleshooting section
2. Review existing documentation
3. Contact your IT support for technical issues
4. Connect with other educators using this resource

---

**Happy investigating, Neural Detectives!** 🧠⚡️

*This activity demonstrates how computational tools can enhance biological education by making abstract concepts tangible and interactive.*