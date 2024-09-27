pipeline{
    agent any
    tools{
        nodejs 'nodejs'
    }
    stages{
        stage('Build React App'){
            steps{
                git branch: 'ahmed-v1', url: 'https://github.com/soyeb88/social-media-2024-v1-front-end-react.git'
                bat 'npm install'
                bat 'npm run build'
                //bat 'xcopy /Y C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\socialmedia-devops-automation-nodejs-frontend\\build C:\\Users\\soyeb\\Documents\\social-media-2024\\Host\\nginx-1.27.0\\nginx-1.27.0\\html /s /e'
            }
        }
        stage('Build Docker Image'){
            steps{
                bat 'docker build -t soyeb88/social-media-2024-v1-frontend:latest .'
            }
        }
        stage('Push Docker Hub'){
            steps{
                script{
                    bat 'docker login -u soyeb88 -p Dhaka_866'
                    bat 'docker push soyeb88/social-media-2024-v1-frontend:latest'
                }
            }
        }
        stage('Deploy to K8s'){
            steps{
                script{
                	withKubeConfig(credentialsId: 'k8s2', namespace: 'jenkins', restrictKubeConfigAccess: false) {
    					bat 'kubectl apply -f social-media-2024-v1-client.yaml'
					}
                }
            }
        }
    }
}