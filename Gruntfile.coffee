module.exports = (grunt) ->
    config =
        pkg: "<json:package.json>"

        coffee:
            default:
                options:
                    bare: true
                files:
                    "dist/game.js": "src/game.coffee"
                    "dist/app.js":  "src/app.coffee"

        uglify:
            default:
                files:
                    "xxx": "xxx"
                    #"dist/game.js": "dist/game.js"

        watch:
            default:
                files: ["src/*.coffee"]
                tasks: ["coffee"],
            all:
                files: "src/*.coffee"
                tasks: ["coffee", "uglify"]

    
    grunt.initConfig config

    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-uglify"
    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.registerTask "default", ["coffee", "uglify"]
