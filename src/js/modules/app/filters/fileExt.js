(function () {
    angular.module('app').filter('fileExt', function () {
        return function (file, fallbackIcon) {
            if (file === undefined || file === '') return fallbackIcon + '';

            var aryFileType = file.split('.');
            var proposedIcon = 'file-' + aryFileType[aryFileType.length - 1];

            var allowedIcons = {
                'file-avi':true,
                'file-bmp':true,
                'file-cpcl':true,
                'file-cpf':true,
                'file-csv':true,
                'file-dat':true,
                'file-dib':true,
                'file-doc':true,
                'file-docx':true,
                'file-dwg':true,
                'file-dxf':true,
                'file-emf':true,
                'file-epl':true,
                'file-epl2':true,
                'file-eps':true,
                'file-fmt':true,
                'file-gif':true,
                'file-html':true,
                'file-ics':true,
                'file-iso':true,
                'file-jpg':true,
                'file-m4v':true,
                'file-mid':true,
                'file-mov':true,
                'file-mp3':true,
                'file-mp4':true,
                'file-mpg':true,
                'file-num':true,
                'file-odp':true,
                'file-ods':true,
                'file-odt':true,
                'file-ots':true,
                'file-ott':true,
                'file-oxps':true,
                'file-pcx':true,
                'file-pdf':true,
                'file-pgs':true,
                'file-png':true,
                'file-ppd':true,
                'file-pps':true,
                'file-ppt':true,
                'file-ps':true,
                'file-qt':true,
                'file-rar':true,
                'file-rtf':true,
                'file-sql':true,
                'file-tga':true,
                'file-tgz':true,
                'file-tiff':true,
                'file-txt':true,
                'file-wav':true,
                'file-xls':true,
                'file-xlsx':true,
                'file-xml':true,
                'file-xps':true,
                'file-yml':true,
                'file-zip':true,
                'file-zpl':true
            }

            if(allowedIcons[proposedIcon]){
                return proposedIcon;
            }else{
                return fallbackIcon
            }
        }
    });
})();