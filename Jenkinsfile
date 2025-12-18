pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'menu-selector'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Env') {
            steps {
                withCredentials([file(credentialsId: 'menu-selector-env', variable: 'ENV_FILE')]) {
                    sh 'cp $ENV_FILE .env'
                }
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build --no-cache'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down --remove-orphans || true'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        failure {
            sh 'docker-compose logs'
        }
    }
}
