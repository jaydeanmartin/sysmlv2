from fastapi import FastAPI
import requests
import json


app = FastAPI()
host = "http://sysmlapiserver:9000"

@app.get("/sysml/projects")
def get_projects():
    # let's start with some fake data
    projects_data = []
    projects_url = f"{host}/projects" 
    projects_response = requests.get(projects_url)
    if projects_response.status_code == 200:
        projects = projects_response.json()
        projects_data = list(map(lambda b: {'name':b['name'], 'id':b['@id']}, projects))
    # let's start with some fake data
    res = { 'projects': projects_data}
    return res
