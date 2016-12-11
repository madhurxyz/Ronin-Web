from flask import Flask, render_template
new = Flask(__name__)

@new.route("/")
def main():
    return render_template("main.html")

if __name__ == "__main__":
    new.run()
