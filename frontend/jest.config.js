modules.exports = {
    testenvironment:'jsdom', //simula do dom existente no navegador - precisa da  testing-library neste caso para react
    testPathIgnorePatterns:[
        '<rootDir>/node_modules',
        '<rootDir>/.next'
    ],
    moduleDirectories:[ 
        'node_modules',
        'src'
    ],
    transform:{
        'ˆ.++\\.(js|jsx|ts|tsx)$':'<rootDir>/node_modules/babel-jest',
    },
    setupFilesAfterEnv=['</rootDir>/setupTests.js']
}