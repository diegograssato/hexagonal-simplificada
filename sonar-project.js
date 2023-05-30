import sonarqubeScanner from 'sonarqube-scanner'

const serverUrl = process.env.SONARQUBE_URL || 'http://10.22.0.20:9000'
const sonarLogin = process.env.SONARQUBE_LOGIN || 'admin'
const sonarPassword = process.env.SONARQUBE_PASSWORD || 'admin123'

sonarqubeScanner(
  {
    serverUrl,
    options: {
      'sonar.login': sonarLogin,
      'sonar.password': sonarPassword,
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.inclusions': '**', // Entry point of your code
      'sonar.test.inclusions': 'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'coverage/test-reporter.xml',
      'sonar.coverage.exclusions':  'src/config/index.ts,src/infra/logger/logger.ts, src/**/index.ts, src/infra/swagger/index.ts, src/app.ts'
    }
  }, () => {})
