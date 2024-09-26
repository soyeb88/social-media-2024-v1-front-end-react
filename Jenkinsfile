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
                bat 'xcopy /Y C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\socialmedia-devops-automation-nodejs-frontend\\build C:\\Users\\soyeb\\Documents\\social-media-2024\\Host\\nginx-1.27.0\\nginx-1.27.0\\html /s /e'
            }
        }
    }
}