import pandas

excel_data_df = pandas.read_excel('data/product.xlsx', sheet_name='magento_catalog_product_2024011')

json_str = excel_data_df.to_json()

print('Excel Sheet to JSON:\n', json_str)
