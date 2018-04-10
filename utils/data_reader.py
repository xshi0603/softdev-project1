import csv

'''
    filename: The name of a csv file with two columns (in string format).
              To standardize our data, the first column will be the state
              name (string)  and the second column will be the data (double).
    returns: a dictionary with the state name as the key and the data as
             the value
'''
def read_csv( filename ):
    with open(filename) as file:
        reader = csv.reader( file )
        next( reader )
        results = dict( reader )
    return results





# -------------------- TESTING -----------------------
if __name__ == '__main__':
    print read_csv( '../data/lifeexpect.csv' )

