pipeline {
  agent {
    node {
      label 'NodeJs'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm run build'
        sh 'npm run build'
      }
    }
    stage('Dockerize') {
      parallel {
        stage('Dockerize') {
          steps {
            sh 'npm run build'
          }
        }
        stage('Dockerize 2') {
          steps {
            sh 'npm run build'
          }
        }
      }
    }
    stage('Deploy') {
      parallel {
        stage('Deploy') {
          steps {
            sh 'npm run build'
          }
        }
        stage('Deploy 2') {
          steps {
            sh 'npm run build'
          }
        }
      }
    }
    stage('End') {
      steps {
        sh 'npm run build'
      }
    }
  }
  environment {
    TEST_ENV = 'TEST'
  }
}