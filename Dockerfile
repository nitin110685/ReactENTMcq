FROM tomcat:8.5.37-jre8
MAINTAINER maha@gmail.com
RUN apt-get update
ADD  /var/lib/jenkins/workspace/myReactproject /usr/local/tomcat/webapps/
WORKDIR /usr/local/tomcat/webapps/
EXPOSE 8080
CMD ["catalina.sh", "run"]
