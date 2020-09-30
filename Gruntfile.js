
module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            stuff:  {
                files: ['src/index.html', 'bower_components/enspire.platform/themes/cantata/enspire.ui/*.scss'],
                tasks: ['enspire'],
                options: {
                    spawn: false
                }
            }
        },
        copy:{
            copyace: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/ace-builds/src-min-noconflict/',
                    src: ['ace.js','mode-javascript.js','mode-html.js','mode-xml.js','mode-json.js','theme-chrome.js'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-enspire');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dist', ['enspire:dist','copy'] );

};
