pipeline {
    agent any
    environment { HOME = "${env.WORKSPACE}" }
    stages {
        stage('NPM Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('NPM Build develop') {
            when {
              not {
                anyOf {
                    tag 'PROD-RELEASE'
                    branch 'master'
                }
              }
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('NPM Build production') {
            when {
                anyOf {
                    tag 'PROD-RELEASE'
                    branch 'master'
                }
            }
            steps {
                sh 'npm run build:prod'
            }
        }
        stage('Run unit tests') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Deploy to Website') {
              when {
                  anyOf {
                      tag 'PROD-RELEASE'
                      branch 'master'
                  }
              }
             steps {
                sh 'cp -r ./dist/airqualityhome-app/browser/. /var/www/app'
           }
        }
    }
}
