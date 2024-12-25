pipeline {
 agent any
 environment {
 CI = 'true'
 }
 stages {
 stage('Checkout') {
 steps {
 git branch: 'main', url: 'https://github.com/Heltrizulfikar23'
 }
 }
 stage('Install Dependencies') {
 steps {
 sh 'npm install'
 }
 }
 stage('Run Unit Tests') {
 steps {
 sh 'npm test'
 }
 }
 stage('Build') {
 steps {
 echo 'Building the application...'
 }
 }
 stage('Deploy') {
    steps {
 echo 'Deploying the application...'
 
 }
 }
