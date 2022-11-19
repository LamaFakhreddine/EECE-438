FROM python:3.8   

# setup environment variable  
ENV DockerHOME=/lab8  

# create root directory for the django app in the container
RUN mkdir -p $DockerHOME  

# set the working directory to /lab8 
WORKDIR $DockerHOME  

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1  

# install dependencies  
RUN pip install --upgrade pip  

# copy whole project into the container at /lab8
COPY . $DockerHOME  

# install all dependencies from requirements.txt  
RUN pip install -r requirements.txt  

# expoe port 80000 where the app runs  
EXPOSE 8000  

# start server  
CMD python manage.py runserver 0.0.0.0:8000