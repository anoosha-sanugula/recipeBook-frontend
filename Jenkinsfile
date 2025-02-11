pipeline {
    agent any
    environment {
        // PATH = "/usr/local/bin:${env.PATH}"
        REACT_APP_BASE_URL="http://localhost:4000/recipebook"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/anoosha-sanugula/recipeBook-frontend.git'
            }
        }
        stage('Install Frontend dependencies') {
            steps {
                sh 'npm install' 
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'  
            }
        }
        stage('Test') {
            steps {
                sh 'npm test' 
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
        always {
            mail bcc: '', body: """'project:${env.JOB_NAME} Build number: ${env.BUILD_NUMBER}  url:${env.BUILD_URL}'""", subject: """'${currentBuild.result}'""", to: 'anooshasanugula@gmail.com'
        }
    }
}