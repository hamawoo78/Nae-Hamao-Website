#!/usr/bin/env python3
"""
Simple Flask app to serve Jinja2 templates.
This allows you to use template inheritance with dynamic rendering.

Usage:
    pip install flask
    python app.py

Then open http://localhost:5000 in your browser.
"""

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    """Render the homepage."""
    return render_template('index.html')

@app.route('/school_projects')
@app.route('/school_projects.html')
def school_projects():
    """Render the school projects page."""
    return render_template('school_projects.html')

@app.route('/example')
@app.route('/example-page.html')
def example():
    """Render the example page."""
    return render_template('example-page.html')

if __name__ == '__main__':
    print("Starting Flask development server...")
    print("Open http://localhost:5000 in your browser")
    print("Available routes:")
    print("  / - Homepage")
    print("  /school_projects - School Projects page")
    print("  /example - Example page")
    print("\nPress Ctrl+C to stop the server")
    
    app.run(debug=True, host='0.0.0.0', port=5000)