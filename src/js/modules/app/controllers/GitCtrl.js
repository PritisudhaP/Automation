myApp.controller('GitCtrl', ['$rootScope', '$scope', '$enLocalStorage', '$enspirePermissions', '$http', 'ObjectDiff', 'growl', function($rootScope, $scope, $enLocalStorage, $enspirePermissions, $http, ObjectDiff, growl) {
    $scope.gitDataDomainsList = $enspirePermissions.getDataDomainsForPermission({
        functionalDomainRefName : 'Git',
        functionalActionRefName : 'Sync'
    });
    if ($enspirePermissions.hasPermission('Git:Sync', 'app.cantata')) {
        if ($scope.gitDataDomainsList.indexOf('app.cantata') < 0) {
        $scope.gitDataDomainsList.push('app.cantata');
    }
    }
    $scope.gitDataDomain = undefined;
    $scope.branchName = undefined;

    $scope.initDomainAndBranch = function() {
        var lastDD = null;
        var lastBranch = null;
        if ((typeof $scope.user) !== 'undefined' && $scope.user != null && (typeof $scope.user.refKey) !== 'undefined') {
            lastDD = $enLocalStorage.get('lsGitDataDomain.user' + $scope.user.refKey);
            lastBranch = $enLocalStorage.get('lsGitBranch.user' + $scope.user.refKey);
        }

        if (((typeof $scope.gitDataDomainsList) !== 'undefined') && $scope.gitDataDomainsList.length > 0) {
            if((typeof lastDD) !== 'undefined' && lastDD != null && $scope.gitDataDomainsList.indexOf(lastDD) !== -1) {
                $scope.gitDataDomain = lastDD;
            } else {
                $scope.gitDataDomain = $scope.gitDataDomainsList[0];
            }
        }

        if ((typeof lastBranch) !== 'undefined' && lastBranch != null){
            $scope.branchName = lastBranch;
        } else {
            $scope.branchName = 'master';
        }

        $scope.getObjects();
    }
    $scope.setDomain = function (domain) {
        if (angular.isDefined(domain)) {
            $scope.gitDataDomain = domain;
        } else if (((typeof $scope.gitDataDomainsList) !== 'undefined') && $scope.gitDataDomainsList.length > 0) {
            $scope.gitDataDomain = $scope.gitDataDomainsList[0];
        }
        if ((typeof $scope.user) !== 'undefined' && $scope.user != null && (typeof $scope.user.refKey) !== 'undefined') {
            $enLocalStorage.set('lsGitDataDomain.user' + $scope.user.refKey, $scope.gitDataDomain);
        }

        $scope.getObjects();
    }
    $scope.setBranchName = function (name) {

        if (angular.isDefined(name)) {
            $scope.branchName = name;
        } else if (((typeof $scope.branchNames) !== 'undefined') && $scope.branchNames.data.length > 0) {
            $scope.branchName = $scope.branchNames.data[0];
        }
        if ((typeof $scope.user) !== 'undefined' && $scope.user != null && (typeof $scope.user.refKey) !== 'undefined') {
            $enLocalStorage.set('lsGitBranch.user' + $scope.user.refKey, $scope.branchName);
        }
        $scope.getObjects();
    }

    $scope.chosenMap = {};

    $scope.getObjects = function () {
        if (angular.isDefined($scope.gitConnectionConfig)) {
            $scope.gitConnectionConfig.get();
        }
        if (angular.isDefined($scope.managed)) {
            $scope.managed.get();
        }
        if (angular.isDefined($scope.availableToExport)) {
            $scope.availableToExport.get();
        }
        if (angular.isDefined($scope.functionalDomains)) {
            $scope.functionalDomains.get();
        }
        if (angular.isDefined($scope.branchNames)) {
            $scope.branchNames.get();
        }
    }


    $scope.addToOrRemoveFromChosenMap = function(objType, refName){
        var obj = {"objType" : objType, "refName": refName};
        var key = objType + "|" + refName;
        if($scope.chosenMap.hasOwnProperty(key)){
            delete $scope.chosenMap[key];
        } else {
            $scope.chosenMap[key] = obj;
        }
    };


    $scope.importFromGit = function(){
        if ($scope.managed.selected && $scope.managed.selected.length) {
            for (var i = 0; i < $scope.managed.selected.length; i++) {
                $scope.addToOrRemoveFromChosenMap($scope.managed.selected[i].functionalDomain, $scope.managed.selected[i].refName)
            }
        }
        if ($scope.chosenMap) {
            var submitmap = {};
            for (var key in $scope.chosenMap) {
                if ($scope.chosenMap.hasOwnProperty(key)) {
                    var obj = $scope.chosenMap[key];
                    if (obj) {
                        if (!submitmap.hasOwnProperty(obj["objType"])) {
                            submitmap[obj["objType"]] = [obj["refName"]];
                        } else {
                            submitmap[obj["objType"]].push(obj["refName"]);
                        }
                    }
                }
            }
            if (submitmap) {
                $scope.pull.data = submitmap;
                $scope.pull.post();

            }
            $scope.chosenMap = {};
        }
    };
    $scope.deleteFromGit = function(){
        if ($scope.managed.selected && $scope.managed.selected.length) {
            for (var i = 0; i < $scope.managed.selected.length; i++) {
                $scope.addToOrRemoveFromChosenMap($scope.managed.selected[i].functionalDomain, $scope.managed.selected[i].refName)
            }
        }
        if ($scope.chosenMap) {
            var submitmap = {};
            for (var key in $scope.chosenMap) {
                if ($scope.chosenMap.hasOwnProperty(key)) {
                    var obj = $scope.chosenMap[key];
                    if (obj) {
                        if (!submitmap.hasOwnProperty(obj["objType"])) {
                            submitmap[obj["objType"]] = [obj["refName"]];
                        } else {
                            submitmap[obj["objType"]].push(obj["refName"]);
                        }
                    }
                }
            }
            if (submitmap) {
                $scope.delete.data = submitmap;
                $scope.delete.post();

            }
            $scope.chosenMap = {};
        }
    };
    $scope.exportToGit = function(){
        if ($scope.availableToExport.selected && $scope.availableToExport.selected.length) {
            for (var i = 0; i < $scope.availableToExport.selected.length; i++) {
                $scope.addToOrRemoveFromChosenMap($scope.availableToExport.selected[i].functionalDomain, $scope.availableToExport.selected[i].refName)
            }
        }
        if ($scope.chosenMap) {
            var submitmap = {};
            for (var key in $scope.chosenMap) {
                if ($scope.chosenMap.hasOwnProperty(key)) {
                    var obj = $scope.chosenMap[key];
                    if (obj) {
                        if (!submitmap.hasOwnProperty(obj["objType"])) {
                            submitmap[obj["objType"]] = [obj["refName"]];
                        } else {
                            submitmap[obj["objType"]].push(obj["refName"]);
                        }
                    }
                }
            }
            if (submitmap) {

                $scope.push.data = submitmap;
                $scope.push.post();

            }
            $scope.chosenMap = {};
        }
    };


    $scope.showResetGrowl = function () {
        growl.success("<strong>Reset successful.</strong>", {ttl: 5000});
    };

$scope.evaluateDifferences = function (diff) {
    var fragment = document.createDocumentFragment();
    for (var i=0; i < diff.length; i++) {

        if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
            var swap = diff[i];
            diff[i] = diff[i + 1];
            diff[i + 1] = swap;
        }

        var node;
        if (diff[i].removed) {
            node = document.createElement('del');
            node.appendChild(document.createTextNode(diff[i].value));
        } else if (diff[i].added) {
            node = document.createElement('ins');
            node.appendChild(document.createTextNode(diff[i].value));
        } else {
            node = document.createTextNode(diff[i].value);
        }
        fragment.appendChild(node);
    }
    var changes = JsDiff.convertChangesToXML(fragment);
    return changes;
};

    $scope.setupDiffs = function () {
        $scope.diffArray = [];
        if (angular.isDefined($scope.diffs.data)) {
            for (var i = 0; i < $scope.diffs.data.length; i++) {
                var diffObject = {};
                diffObject.local = $scope.diffs.data[i].local || '';
                diffObject.remote = $scope.diffs.data[i].remote || '';
                diffObject.field = $scope.diffs.data[i].field;
                diffObject.pre = false;

                if ((typeof diffObject.local === 'string' || diffObject.local instanceof String) &&
                    (typeof diffObject.remote === 'string') || diffObject.remote instanceof String) {
                        diffObject.pre = true;
                        var diff = JsDiff.diffChars(diffObject.local, diffObject.remote);
                        var changes = JsDiff.convertChangesToXML(diff);
                        diffObject.diffValue = changes;

                } else if ((typeof diffObject.local === 'object' || diffObject.local instanceof Object) &&
                           (typeof diffObject.remote === 'object') || diffObject.remote instanceof Object) {
                    // you can directly diff your objects js now or parse a Json to object and diff
                    var diffObj = ObjectDiff.diffOwnProperties(diffObject.local, diffObject.remote);

                    // gives a full object view with Diff highlighted
                    diffObject.diffValue = ObjectDiff.toJsonView(diffObj);

                    // gives object view with onlys Diff highlighted
                    diffObject.diffValueChanges = ObjectDiff.toJsonDiffView(diffObj);

                }
                // This is required only if you want to show a JSON formatted view of your object without using a filter
                diffObject.localJsonView = ObjectDiff.objToJsonView(diffObject.local);
                diffObject.remoteJsonView = ObjectDiff.objToJsonView(diffObject.remote);


                // you can directly diff your objects including prototype properties and inherited properties using `diff` method
                //var diffAll = ObjectDiff.diff($scope.local, $scope.remote);


                $scope.diffArray.push(diffObject);
            }
        }
    }
    var JsDiff = (function () {
        /*jshint maxparams: 5*/
        function clonePath(path) {
            return {
                newPos: path.newPos,
                components: path.components.slice(0)
            };
        }

        function removeEmpty(array) {
            var ret = [];
            for (var i = 0; i < array.length; i++) {
                if (array[i]) {
                    ret.push(array[i]);
                }
            }
            return ret;
        }

        function escapeHTML(s) {
            var n = s;
            n = n.replace(/&/g, '&amp;');
            n = n.replace(/</g, '&lt;');
            n = n.replace(/>/g, '&gt;');
            n = n.replace(/"/g, '&quot;');

            return n;
        }

        var Diff = function (ignoreWhitespace) {
            this.ignoreWhitespace = ignoreWhitespace;
        };
        Diff.prototype = {
            diff: function (oldString, newString) {
                // Handle the identity case (this is due to unrolling editLength == 0
                if (newString === oldString) {
                    return [{
                        value: newString
                    }];
                }
                if (!newString) {
                    return [{
                        value: oldString,
                        removed: true
                    }];
                }
                if (!oldString) {
                    return [{
                        value: newString,
                        added: true
                    }];
                }

                newString = this.tokenize(newString);
                oldString = this.tokenize(oldString);

                var newLen = newString.length,
                    oldLen = oldString.length;
                var maxEditLength = newLen + oldLen;
                var bestPath = [{
                    newPos: -1,
                    components: []
                }];

                // Seed editLength = 0
                var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
                if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
                    return bestPath[0].components;
                }

                for (var editLength = 1; editLength <= maxEditLength; editLength++) {
                    for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
                        var basePath;
                        var addPath = bestPath[diagonalPath - 1],
                            removePath = bestPath[diagonalPath + 1];
                        oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
                        if (addPath) {
                            // No one else is going to attempt to use this value, clear it
                            bestPath[diagonalPath - 1] = undefined;
                        }

                        var canAdd = addPath && addPath.newPos + 1 < newLen;
                        var canRemove = removePath && 0 <= oldPos && oldPos < oldLen;
                        if (!canAdd && !canRemove) {
                            bestPath[diagonalPath] = undefined;
                            continue;
                        }

                        // Select the diagonal that we want to branch from. We select the prior
                        // path whose position in the new string is the farthest from the origin
                        // and does not pass the bounds of the diff graph
                        if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {
                            basePath = clonePath(removePath);
                            this.pushComponent(basePath.components, oldString[oldPos], undefined, true);
                        } else {
                            basePath = clonePath(addPath);
                            basePath.newPos++;
                            this.pushComponent(basePath.components, newString[basePath.newPos], true, undefined);
                        }

                        var oldPos = this.extractCommon(basePath, newString, oldString, diagonalPath);

                        if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
                            return basePath.components;
                        } else {
                            bestPath[diagonalPath] = basePath;
                        }
                    }
                }
            },

            pushComponent: function (components, value, added, removed) {
                var last = components[components.length - 1];
                if (last && last.added === added && last.removed === removed) {
                    // We need to clone here as the component clone operation is just
                    // as shallow array clone
                    components[components.length - 1] = {
                        value: this.join(last.value, value),
                        added: added,
                        removed: removed
                    };
                } else {
                    components.push({
                        value: value,
                        added: added,
                        removed: removed
                    });
                }
            },
            extractCommon: function (basePath, newString, oldString, diagonalPath) {
                var newLen = newString.length,
                    oldLen = oldString.length,
                    newPos = basePath.newPos,
                    oldPos = newPos - diagonalPath;
                while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
                    newPos++;
                    oldPos++;

                    this.pushComponent(basePath.components, newString[newPos], undefined, undefined);
                }
                basePath.newPos = newPos;
                return oldPos;
            },

            equals: function (left, right) {
                var reWhitespace = /\S/;
                if (this.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right)) {
                    return true;
                } else {
                    return left === right;
                }
            },
            join: function (left, right) {
                return left + right;
            },
            tokenize: function (value) {
                return value;
            }
        };

        var CharDiff = new Diff();

        var WordDiff = new Diff(true);
        WordDiff.tokenize = function (value) {
            return removeEmpty(value.split(/(\s+|\b)/));
        };

        var CssDiff = new Diff(true);
        CssDiff.tokenize = function (value) {
            return removeEmpty(value.split(/([{}:;,]|\s+)/));
        };

        var LineDiff = new Diff();
        LineDiff.tokenize = function (value) {
            return value.split(/^/m);
        };

        return {
            Diff: Diff,

            diffChars: function (oldStr, newStr) {
                return CharDiff.diff(oldStr, newStr);
            },
            diffWords: function (oldStr, newStr) {
                return WordDiff.diff(oldStr, newStr);
            },
            diffLines: function (oldStr, newStr) {
                return LineDiff.diff(oldStr, newStr);
            },

            diffCss: function (oldStr, newStr) {
                return CssDiff.diff(oldStr, newStr);
            },

            createPatch: function (fileName, oldStr, newStr, oldHeader, newHeader) {
                var ret = [];

                ret.push('Index: ' + fileName);
                ret.push('===================================================================');
                ret.push('--- ' + fileName + (typeof oldHeader === 'undefined' ? '' : '\t' + oldHeader));
                ret.push('+++ ' + fileName + (typeof newHeader === 'undefined' ? '' : '\t' + newHeader));

                var diff = LineDiff.diff(oldStr, newStr);
                if (!diff[diff.length - 1].value) {
                    diff.pop(); // Remove trailing newline add
                }
                diff.push({
                    value: '',
                    lines: []
                }); // Append an empty value to make cleanup easier

                function contextLines(lines) {
                    return lines.map(function (entry) {
                        return ' ' + entry;
                    });
                }

                function eofNL(curRange, i, current) {
                    var last = diff[diff.length - 2],
                        isLast = i === diff.length - 2,
                        isLastOfType = i === diff.length - 3 && (current.added !== last.added || current.removed !== last.removed);

                    // Figure out if this is the last line for the given file and missing NL
                    if (!/\n$/.test(current.value) && (isLast || isLastOfType)) {
                        curRange.push('\\ No newline at end of file');
                    }
                }

                var oldRangeStart = 0,
                    newRangeStart = 0,
                    curRange = [],
                    oldLine = 1,
                    newLine = 1;
                for (var i = 0; i < diff.length; i++) {
                    var current = diff[i],
                        lines = current.lines || current.value.replace(/\n$/, '').split('\n');
                    current.lines = lines;

                    if (current.added || current.removed) {
                        if (!oldRangeStart) {
                            var prev = diff[i - 1];
                            oldRangeStart = oldLine;
                            newRangeStart = newLine;

                            if (prev) {
                                curRange = contextLines(prev.lines.slice(-4));
                                oldRangeStart -= curRange.length;
                                newRangeStart -= curRange.length;
                            }
                        }
                        curRange.push.apply(curRange, lines.map(function (entry) {
                            return (current.added ? '+' : '-') + entry;
                        }));
                        eofNL(curRange, i, current);

                        if (current.added) {
                            newLine += lines.length;
                        } else {
                            oldLine += lines.length;
                        }
                    } else {
                        if (oldRangeStart) {
                            // Close out any changes that have been output (or join overlapping)
                            if (lines.length <= 8 && i < diff.length - 2) {
                                // Overlapping
                                curRange.push.apply(curRange, contextLines(lines));
                            } else {
                                // end the range and output
                                var contextSize = Math.min(lines.length, 4);
                                ret.push(
                                    '@@ -' + oldRangeStart + ',' + (oldLine - oldRangeStart + contextSize) + ' +' + newRangeStart + ',' + (newLine - newRangeStart + contextSize) + ' @@');
                                ret.push.apply(ret, curRange);
                                ret.push.apply(ret, contextLines(lines.slice(0, contextSize)));
                                if (lines.length <= 4) {
                                    eofNL(ret, i, current);
                                }

                                oldRangeStart = 0;
                                newRangeStart = 0;
                                curRange = [];
                            }
                        }
                        oldLine += lines.length;
                        newLine += lines.length;
                    }
                }

                return ret.join('\n') + '\n';
            },

            applyPatch: function (oldStr, uniDiff) {
                var diffstr = uniDiff.split('\n');
                var diff = [];
                var remEOFNL = false,
                    addEOFNL = false;

                for (var i = (diffstr[0][0] === 'I' ? 4 : 0); i < diffstr.length; i++) {
                    if (diffstr[i][0] === '@') {
                        var meh = diffstr[i].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);
                        diff.unshift({
                            start: meh[3],
                            oldlength: meh[2],
                            oldlines: [],
                            newlength: meh[4],
                            newlines: []
                        });
                    } else if (diffstr[i][0] === '+') {
                        diff[0].newlines.push(diffstr[i].substr(1));
                    } else if (diffstr[i][0] === '-') {
                        diff[0].oldlines.push(diffstr[i].substr(1));
                    } else if (diffstr[i][0] === ' ') {
                        diff[0].newlines.push(diffstr[i].substr(1));
                        diff[0].oldlines.push(diffstr[i].substr(1));
                    } else if (diffstr[i][0] === '\\') {
                        if (diffstr[i - 1][0] === '+') {
                            remEOFNL = true;
                        } else if (diffstr[i - 1][0] === '-') {
                            addEOFNL = true;
                        }
                    }
                }

                var str = oldStr.split('\n');
                for (var i = diff.length - 1; i >= 0; i--) {
                    var d = diff[i];
                    for (var j = 0; j < d.oldlength; j++) {
                        if (str[d.start - 1 + j] !== d.oldlines[j]) {
                            return false;
                        }
                    }
                    Array.prototype.splice.apply(str, [d.start - 1, +d.oldlength].concat(d.newlines));
                }

                if (remEOFNL) {
                    while (!str[str.length - 1]) {
                        str.pop();
                    }
                } else if (addEOFNL) {
                    str.push('');
                }
                return str.join('\n');
            },

            convertChangesToXML: function (changes) {
                var ret = [];
                for (var i = 0; i < changes.length; i++) {
                    var change = changes[i];
                    if (change.added) {
                        ret.push("<ins class='diff'>");
                    } else if (change.removed) {
                        ret.push("<del class='diff'>");
                    }

                    ret.push(escapeHTML(change.value));

                    if (change.added) {
                        ret.push('</ins>');
                    } else if (change.removed) {
                        ret.push('</del>');
                    }
                }
                return ret.join('');
            },

            // See: http://code.google.com/p/google-diff-match-patch/wiki/API
            convertChangesToDMP: function (changes) {
                var ret = [],
                    change;
                for (var i = 0; i < changes.length; i++) {
                    change = changes[i];
                    ret.push([(change.added ? 1 : change.removed ? -1 : 0), change.value]);
                }
                return ret;
            }
        };
    })();

    if (typeof module !== 'undefined') {
        module.exports = JsDiff;
    }
}]);


