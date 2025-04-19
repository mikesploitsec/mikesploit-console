from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return """
    <pre>
    mikesploit console is online.

    Welcome to the signal.
    </pre>
    """

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6969)
