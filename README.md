# Team WXIJ

## Data Sets
- Average life expectancy for residents of every state
- compared to other factors such as...
  - GDP per capita
  - State Health Spending Per Capita 
  - Obama Approval Rating 
  - State Unemployment Rate 
  - State Wellbeing Index 
  - etc...

## Sources
Example our project is base on:
http://charts.animateddata.co.uk/whatmakesushappy/

### Data
GDP per Capita per state for 2014:
https://bea.gov/scb/pdf/2015/07%20July/0715_gross_domestic_product_by_state.pdf

Life Expectancy of the 50 states in 2014:
http://www.businessinsider.com/us-states-with-the-highest-and-lowest-life-expectancy-2017-5

Unemployment Rates for every state in 2014: 
https://www.bls.gov/lau/lastrk14.htm

Unemployment Rates for every state in 2018:
https://www.bls.gov/web/laus/laumstrk.htm

Healthcare Expenditure by State in 2014:
https://www.kff.org/other/state-indicator/health-spending-per-capita/?currentTimeframe=0&sortModel=%7B%22colId%22:%22Location%22,%22sort%22:%22asc%22%7D

Huge database on information per state on data categories such as drinking and obesity:
https://www.americashealthrankings.org/explore/2016-annual-report/measure/ExcessDrink/state/ALL

State Wellbeing Index in 2014:
https://www.livescience.com/49864-happiest-states-2014-full-list.html

Obama Approval 2014:
http://news.gallup.com/poll/125648/obama-approval-among-states-hawaii-warmest-obama.aspx

## Relevance/Significance
The multiple scatterplots will show the relationships between life expectancy in states across the US and factors that we believe can influence life expectancy, such as GDP per capita, unemployment, average alcohol consumption, etc. Comparing these  sets of data to life expectancy can show us trends and help us generalize the effects of a certain aspects on life expectancy.

## Data Visualization

### Absent User Interaction
We will create a scatterplot with the y-axis being the average life expectancy. The x-axis will vary between different factors that the user will be able to choose from. The default factor will be GDP per Capita. Using this data, we will display points that represent states. In addition we will create a line of best fit in order to show the relationship between the factor and life expectancy. In addition, we will show the linear regression so that the user can see how closely related the two are. 

### With User Interaction
The user will be able to select from many different factors and will be able to choose which ones they want to see. In additon, by hovering over each datapoint, they will be able to see the state, the life expectancy, and the other factor.

## Use of D3

We will use D3 in order to accomplish many tasks such as...
- create and scale axis
- create a line of best fit
- plot data points

## Questions

After seeing this data visualization, the user should be able to explore the questions of: 

How does life expectancy affected by ...?
  - GDP per capita
  - State Health Spending Per Capita 
  - Obama Approval Rating 
  - State Unemployment Rate 
  - State Wellbeing Index 
  - etc...
  
  They should also be considering what other factors affect life expectancy, especially because things like Obama Approval Rating can seem have an impact.

## Firefox?

The hovering function does not work on Firefox but if you use a different web browser such as Chrome, it works as intended.

## Mockup

https://docs.google.com/document/d/1X4G9KdUbTkOpNcfzO5srYEkUHF5MRGSzcfgqH7lW6ns/edit?usp=sharing
