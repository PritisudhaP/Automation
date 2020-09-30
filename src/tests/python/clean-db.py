#!/usr/bin/env python2.7

from pprint import pprint
from pymongo import MongoClient
import sys, os

# Mongo connection details
MONGO_USER          = os.environ.get('MONGO_USER', '')
MONGO_PASS          = os.environ.get('MONGO_PASS', '')
MONGO_HOST          = os.environ.get('MONGO_HOST', 'localhost:27017')
MONGO_APP_DBNAME    = os.environ.get('MONGO_APP_DBNAME', 'spring-database')
MONGO_OPTS          = os.environ.get('MONGO_OPTS', '')
MONGO_AUTH          = '' if not MONGO_USER else '%s:%s@' % (MONGO_USER, MONGO_PASS)
MONGO_URL           = os.environ.get('MONGO_CONN_URI_APPSDB', 'mongodb://%(MONGO_AUTH)s/%(MONGO_APP_DBNAME)s?%(MONGO_OPTS)s' % locals())
PROJECT             = os.environ.get('PROJECT', '').upper()

def main():
  results = []
  print(MONGO_URL)
  mongoclient = MongoClient(MONGO_URL)
  if PROJECT == 'SCL':
    dataDomain = "com.scl"
    db = mongoclient[MONGO_APP_DBNAME]
    skuList = ["B4","BBB5","BJER3","BR","DAMAGED-BR","DAMAGED-FM","sarathSCLProduct0001","sarathSCLProduct0002","CB","DAMAGED-ER","sarathP1"]

    for sku in skuList:
      results.append({ sku: db['inventoryPoolEntry'].remove({"productIdentifier":sku}) })

    results.append( db['product'].remove({"refName":"sarathproducttc0001"}) )
    results.append( db['product'].remove({"refName":"sarathp1"}) )
    results.append( db['sku'].remove({"refName":"sarathp1"}) )
    results.append( db['sku'].remove({"refName":"sarathp2"}) )

  elif PROJECT == 'PSSC':
    dataDomain = "com.pssc"
    db = mongoclient[MONGO_APP_DBNAME]
    results.append( db['escrowStatement'].remove({"refName":{"$regex": "sarathcn_tc0001"}}) )
    results.append( db['product'].remove({"refName":"sarathproducttc0001"}) )
    results.append( db['inventoryPoolEntry'].remove({"productIdentifier":"BGBSarathShared01"}) )
    results.append( db['ledger'].remove({"refName":"1212121212-com.pssc-activityLedger"}) )
    results.append( db['ledger'].remove({"refName":"1212121212-com.pssc-escrowLedger"}) )
    results.append( db['sku'].remove({"refName":"BGBSarathShared01_BSOR"}) )
    results.append( db['sku'].remove({"refName":"BGBSarathShared01_BOYD"}) )
    results.append( db['product'].remove({"refName":"BGBSarathShared01_BSOR"}) )
    results.append( db['product'].remove({"refName":"BGBSarathShared01_BOYD"}) )
  mongoclient.close()
  print(MONGO_APP_DBNAME)
  pprint(results)
  return 0

sys.exit(main())
