pipeline{
    agent any
    tools{
        nodejs 'nodejs'
    }
     environment {
        KUBECONFIG = 'C:\\Users\\soyeb\\.kube\\config'
        MINIKUBE_HOME = 'C:\\Users\\soyeb\\.minikube'
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
                 bat 'docker system prune -f'
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
                	withEnv(["--kubeconfig=${KUBECONFIG}"]) {
                        // Run your container in Minikube
                        bat 'kubectl config set-context --current --namespace=jenkins'
                        bat 'kubectl delete pods -l app=app-client'
                        bat 'kubectl apply -f social-media-2024-v1-client.yaml'
                        //bat 'minikube image load soyeb88/social-media-2024-v1-frontend:latest'
                    }
                }
            }
        }
    }
    post{
        always{
            slackSend channel: 'slacknotification', message: "Please find status of pipeline - ${currentBuild.currentResult} ${env.JOB_NAME} ${env.BUILD_NUMBER} ${env.BUILD_URL}"
            mail bcc: '', body: 'Build Info pipeline', cc: 'soyeb88@gmail.com', from: '', replyTo: '', subject: 'Test Result', to: 'ahmedsoyeb866@gmail.com'
        }
    }
}