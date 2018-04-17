from csv import DictReader
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def graph():
    # GET LOAD THE DATA FROM A CSV
    csv_data = []
    with open( "data/data_comp.csv") as file:
        reader = DictReader( file )
        for row in reader:
            csv_data.append( row )
    # print csv_data

    return render_template('homepage.html', data_var = csv_data)

if __name__ == "__main__":
    app.debug = True
    app.run()
