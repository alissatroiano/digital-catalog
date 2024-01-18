import pandas
import json

excel_data_df = pandas.read_excel('data/product.xlsx', sheet_name='magento_catalog_product_2024011')

# Convert excel to string 
# (define orientation of document in this case from up to down)
json_str = excel_data_df.to_json(orient='records')

# Print out the result
print('Excel Sheet to JSON:\n', json_str)

# Convert the string into a list/dictionary
json_str_dict = json.loads(json_str)

# Define file to write to and 'w' for write option -> json.dump() 
# defining the list to write from and file to write to
with open('data/data.json', 'w') as resultFile:
    json.dump(json_str_dict, resultFile)
print('Done.')