pipeline {
    agent any
    environment {
        PATH = "/usr/local/bin:${env.PATH}"
        dockerImage=''
        registry='anoosha1221/recipebook-react'
        registryCredential='docker-hub'
        dockerhub_username='anoosha1221'
        dockerhub_password='Surya@1359'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/anoosha-sanugula/recipeBook-frontend.git'
            }
        }
        stage('Install dependencies') {
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
                sh 'npm run test -- --watchAll=false'
            }
        }
        stage('Build docker image'){
            steps{
                script{
                    dockerImage=docker.build registry
                }
            }
        }
        stage('Docker Push') {
            agent any
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'Surya@1359', usernameVariable: 'anoosha1221')]) {
                    sh 'docker login -u ${dockerhub_username} -p ${dockerhub_password}'
                    sh 'docker push ${registry}'
                }
            }
        }
        stage('Pull Docker image'){
            steps{
                script {
                    echo 'Pulling Docker image from Docker Hub...'
                    sh 'docker pull ${registry}'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    echo 'Running Docker container...'
                    sh 'docker run --name frontend-container -d ${registry}'
                }
            }
        }
        stage('Verify Container Running') {
            steps {
                script {
                    echo 'Verifying if the Docker container is running...'
                    sh 'docker ps -a'
                }
            }
        }
        stage('Remove container'){
            steps {
                script {
                    echo 'Cleaning up Docker container...'
                    sh 'docker rm -f frontend-container || true' 
                }
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
            echo "Sending email notification..."
            mail bcc: '', body: """'project:${env.JOB_NAME} Build number: ${env.BUILD_NUMBER}  url:${env.BUILD_URL}'""", subject: """'${currentBuild.result}'""", to: 'anooshasanugula@gmail.com'
        }
    }
}