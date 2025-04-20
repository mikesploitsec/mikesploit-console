from flask import Flask, render_template, request
import subprocess

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/channel/<tab>")
def load_tab(tab):
    try:
        return render_template(f"{tab}.html")
    except:
        return f"<p>Channel '{tab}' not found.</p>"

@app.route("/launch-enum", methods=["POST"])
def launch_enum():
    data = request.get_json()
    target = data.get("target")
    tools = data.get("tools", [])

    output = []
    if "nmap" in tools:
        result = subprocess.getoutput(f"nmap -T4 {target}")
        output.append("=== NMAP ===\n" + result)
    if "nikto" in tools:
        result = subprocess.getoutput(f"nikto -h {target}")
        output.append("=== NIKTO ===\n" + result)
    # Add more tools as needed...

    return "\n\n".join(output)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6969, debug=True)
