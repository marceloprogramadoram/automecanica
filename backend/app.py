
from importlib import import_module
from flask import Flask, jsonify, Response, request
from flask_sqlalchemy import SQLAlchemy
import mysql.connector
from datetime import datetime
import json
from flask_cors import CORS

import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/oficina'

db = SQLAlchemy(app)

class Manutencao(db.Model):
    __tablename__ = "maintenances"
    id = db.Column(db.Integer, primary_key = True)
    nome = db.Column(db.String(50))
    data_registro = db.Column(db.DateTime, default = datetime.datetime.now)
    
    def __init__(self, nome):
        self.nome = nome
    
    def getMaintenances():
        try:
            maintenance = Manutencao.query.all()
            result = [item.ToJson() for item in maintenance]
            return result
        except Exception as e:
            print(e)
                
    def getMaintenanceById(key):
        try:
            maintenance = Manutencao.query.filter_by(id = key).first()
            return maintenance.ToJson()
        except Exception as e:
            print(e)
            
    
    def AddMaintenance(body):
        try:
            newMaintenance = Manutencao(nome=body["nome"])    
            db.session.add(newMaintenance)
            db.session.commit()
            return  newMaintenance.ToJson()
        except Exception as e:
            print(e)
            raise "Erro ao realizar a operação" 
    
    def UpdateMaintenance(id,data):
        try:
            maintenance = Manutencao.query.filter_by(id = id).first()
            if('nome' in  data):
                maintenance.nome = data['nome']  
            db.session.commit()
            return maintenance.ToJson()
        except Exception as e:
            print(e)
            raise "Erro ao realizar a operação" 
    
    def DeleteMaintenance(id):
        try:
            maintenance = Manutencao.query.filter_by(id = id).first()
            db.session.delete(maintenance)
            db.session.commit()
            return maintenance.ToJson()
        except Exception as e:
            print(e)
            raise "Erro ao realizar a operação"
    
    def ToJson(self):
        return {"id":self.id, "Nome": self.nome}

def EnviaResponse(status, contentName, content, message=False):
    body = {}
    body[contentName] = content
    if (message):
        body["message"] = message
    return Response(json.dumps(body), status=status, mimetype="application/json")

class Servico(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key = True)
    nome = db.Column(db.String(50))
    
    def __init__(self, nome):
        self.nome = nome
        
    
    def getServices():
        try:
            services = Servico.query.all()
            result = [item.ToJson() for item in services]
            return result
        except Exception as e:
            print(e)
                
    def getServiceById(key):
        try:
            service = Servico.query.filter_by(id = key).first()
            return service.ToJson()
        except Exception as e:
            print(e)
            
    
    def AddService(body):
        try:
            newService = Servico(nome=body["nome"])    
            db.session.add(newService)
            db.session.commit()
            return newService.ToJson()
        except Exception as e:
            print(e)
            raise "Erro ao realizar a operação"
    
    def UpdateService(id, data):
        try:
            service = Servico.query.filter_by(id = id).first()
            if('Nome' in  data):
                service.nome = data['Nome']
                   
            db.session.commit()
            return service.ToJson()
        except Exception as e:
            print(e)
            raise "Erro ao realizar a operação"
    
    def DeleteService(id):
        try:
            service = Servico.query.filter_by(id = id).first()
            db.session.delete(service)
            db.session.commit()
            return service.ToJson()
        except Exception as e:
            print(e)
            raise "Erro ao realizar a operação"
    
    def ToJson(self):
        return {"id": self.id, "Nome": self.nome}



class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key = True)
    maintenanceId = db.Column(db.Integer, db.ForeignKey(Manutencao.id))
    serviceId = db.Column(db.Integer, db.ForeignKey(Servico.id))
    registerDate = db.Column(db.DateTime, default = datetime.datetime.now)
    startDate = db.Column(db.DateTime)   
    finishDate = db.Column(db.DateTime)
    status = db.Column(db.Integer, default = 0)
    estimativeDays = db.Column(db.Integer)
    estimetive = db.Column(db.String(50))
    license = db.Column(db.String(15))
    
    
    
    def __init__(self, maintenanceId, serviceId, startDate, finishDate, license ):
        self.maintenanceId = maintenanceId
        self.serviceId = serviceId
        self.startDate = startDate
        self.finishDate = finishDate
        self.license = license
        self.estimativeDays = abs((finishDate - startDate).days)
        if( self.estimativeDays < 7):
            self.estimetive = "Esta Semana"
        elif( self.estimativeDays >=7 and self.estimativeDays <= 14 ):
            self.estimetive = "Próxima Semana"
        elif( self.estimativeDays > 14  and self.estimativeDays <= 30 ):
            self.estimetive = "Esta Mês"
        else:
            self.estimetive = "Próximo Mês"

    def getOrdersByStatus(status):
        try:
            orders = Order.query.filter_by(status = status)
            for item in orders:
                if( item.estimativeDays < 7):
                    item.estimative = "Esta Semana"
                elif( item.estimativeDays >=7 and item.estimativeDays <= 14 ):
                    item.estimative = "Próxima Semana"
                elif( item.estimativeDays > 14  and item.estimativeDays <= 30 ):
                    item.estimative = "Esta Mês"
                else:
                    item.estimative = "Próximo Mês"
            
            result = [item.ToJson() for item in orders]
            return result
        except Exception as e:
            print(e)
            # raise "Erro ao realizar a operação"
        
            
    def getOrderByLicense(license):
        try:
            orders = Order.query.filter_by(license=license).all()
            result = [item.ToJson() for item in orders]
            return result
        except Exception as e:
            print(e)
            #raise "Erro ao realizar a operação"
    
    def AddOrder(body):
        try:
            newOrder = Order(maintenanceId=body["maintenanceId"], serviceId=body["serviceId"], startDate=datetime.datetime.strptime(body["startDate"], '%Y-%m-%d'), finishDate=datetime.datetime.strptime(body["finishDate"], '%Y-%m-%d'),license=body["license"])    
            db.session.add(newOrder)
            db.session.commit()
            return newOrder.ToJson()
        except Exception as e:
            print(e)
            raise "Erro ao realizar a operação" 
    
    def UpdateOrder(id, data):
        try:
            order = Order.query.filter_by(id=id).first()
            if('status' in  data):
                order.status = data["status"]
                
            if('license' in  data):
                order.license = data["license"]
                
            if('startDate' in  data):
                order.startDate = datetime.datetime.strptime(data["startDate"], '%Y-%m-%d')
            
            if('finishDate' in  data):
                order.finishDate = datetime.datetime.strptime(data["finishDate"], '%Y-%m-%d')

            db.session.commit()
            return order.ToJson()
        except Exception as e:
            print(e)
            raise "Erro ao realizar a operação" 
    
    def DeleteOrder(key):
        try:
            order = Order.query.filter_by(id = key).first()
            db.session.delete(order)
            db.session.commit()
            return order.ToJson()
        except Exception as e:
            print(e)
            raise "Erro ao realizar a operação"
    
    def ToJson(self):
        return {"id": self.id, "maintenanceId": self.maintenanceId, "serviceId": self.serviceId, "finishDate" : self.finishDate.strftime('%d/%m/%Y'),
                 "estimetive" : self.estimetive , "license":self.license, "startDate" : self.startDate.strftime('%d/%m/%Y')}

#################################### EndPoints ##########################


#################################### Manutenções  ##########################
@app.route("/manutencao", methods=["GET"])
def GetMaintenances():
    result = Manutencao.getMaintenances()
    return json.dumps(result)

@app.route("/manutencao/<id>", methods=["GET"])
def GetMaintenanceById(id):
    result = Manutencao.getMaintenanceById(id)
    return json.dumps(result)

@app.route("/manutencao", methods=["POST"])
def AddMaintenance():
    body = request.get_json()
    result = Manutencao.AddMaintenance(body)
    return json.dumps(result)

@app.route("/manutencao/<id>", methods=["PUT"])
def UpdateMaintenance(id):
    data = request.get_json()
    result = Manutencao.UpdateMaintenance(id,data)
    return json.dumps(result)

@app.route("/manutencao/<id>", methods=["DELETE"])
def DeleteMaintenance(id):
    result = Manutencao.DeleteMaintenance(id)
    return json.dumps(result)

#################################### Servicos  ##########################
@app.route("/servico", methods=["GET"])
def GetServices():
    result = Servico.getServices()
    return json.dumps(result)

@app.route("/servico/<id>", methods=["GET"])
def GetServiceById(id):
    result = Servico.getServiceById(id)
    return json.dumps(result)

@app.route("/servico", methods=["POST"])
def AddService():
    body = request.get_json()
    result = Servico.AddService(body)
    return json.dumps(result)

@app.route("/servico/<id>", methods=["PUT"])
def UpdateService(id):
    data = request.get_json()
    result = Servico.UpdateService(id, data)
    return json.dumps(result)

@app.route("/servico/<id>", methods=["DELETE"])
def DeleteService(id):
    result = Servico.DeleteService(id)
    return json.dumps(result)


#################################### Ordens de Servico  ##########################

@app.route("/ordem/<status>", methods=["GET"])
def getOrdersByStatus(status):
    result = Order.getOrdersByStatus(status)
    return json.dumps(result)

@app.route("/ordem/license/<license>", methods=["GET"])
def getOrderByLicense(license):
    result = Order.getOrderByLicense(license)
    return json.dumps(result)

@app.route("/ordem", methods=["POST"])
def AddOrdem():
    body = request.get_json()
    result = Order.AddOrder(body)
    return json.dumps(result)

@app.route("/ordem/<id>", methods=["PUT"])
def UpdateOrder(id):
    data = request.get_json()
    result = Order.UpdateOrder(id, data)
    return json.dumps(result)

@app.route("/ordem/<id>", methods=["DELETE"])
def DeleteOrder(id):
    result = Order.DeleteOrder(id)
    return json.dumps(result)


app.run()