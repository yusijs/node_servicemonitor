import nodemailer = require("nodemailer");
import request = require("request");
import childProcess = require("child_process");

import { AppConfig, MailConfig, MailTransport } from './config'

const mailTransporter:nodemailer.Transport = new MailTransport().transporter;

console.log(mailTransporter);
process.exit();

const tests: ITest = {
  request: [
    {
      "plexmediaserver": {
        port: 32400,
        hostname: `192.168.1.198`,
        command: `sudo service plexmediaserver start`
      }
    }
  ]
}

const runTests = (testSuite?: string) => {
  if (testSuite) {
    console.log("?")
    // Run single testsuite
  }
  else {
    for (let i in tests) {
      for (let test of tests[i]) {
        for (let testName in test) {
          let currentTest = test[testName];
          console.log(currentTest);
          request.get(`http://${currentTest.hostname}:${currentTest.port}`, {}, (error: Error, response, body) => {
            if (error) {
              let mailSetup = new MailConfig('ronnie.laugen@gmail.com', `ERROR FOR ${testName}`, JSON.stringify(error)).mailConfig
              
              console.error(error);
              if (currentTest.command) {
                childProcess.exec(currentTest.command, (error, stdout, stderr) => {
                  if (error) console.error(error);
                  else if (stderr) console.error(stderr);
                  else console.info(stdout);
                })
              }
            }
            else
              console.log(response.statusCode)
          })
        }
      }
    }
    // Run all tests
  }
}

runTests();

interface ITest {
  request: {
    [name: string]: {
      port: number
      hostname: string,
      command?: string
    }
  }[]
}