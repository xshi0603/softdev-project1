from csv import DictReader
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def graph():
    # GET LOAD THE DATA FROM A CSV
    data = []
    with open( "data/GDP2014.csv") as file:
        reader = DictReader( file )
        for row in reader:
            data.append( row )
    # print data

    return render_template('homepage.html', data=data)

if __name__ == "__main__":
    app.debug = True
    app.run()
