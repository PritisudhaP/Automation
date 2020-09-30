var taskCreateScreen = require(process.cwd() + '/src/tests/screens/task/task.create.screen.js');
var taskSummaryScreen = require(process.cwd() + '/src/tests/screens/task/task.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Task creation Flow and Bulk operations : ', function(){
    var taskCreate = new taskCreateScreen();
    var taskSummary = new taskSummaryScreen();
    var commons = new common();

        it('Create and Delete a task successfully - TC0001', function(){

            browser.get(taskUrl);
            browser.sleep(2000);
            console.log("navigating to task screen");
            taskCreate.newTask();
            taskCreate.enterTaskRefName("SarathTaskTC0001");
            taskCreate.enterTaskName("SarathTaskTC0001");
            taskCreate.enterTaskStatus("Pending");
            taskCreate.enterTaskLabel("SarathTaskTC0001");
            taskCreate.enterTaskOwner("SarathTaskTC0001");
            taskCreate.enterTaskQueue("SarathTaskTC0001");
            taskCreate.enterTaskCreateDate("01/01/2020");
            taskCreate.enterTaskAssignDate("01/01/2020");
            taskCreate.enterTaskDueDate("01/01/2020");
            taskCreate.enterTaskDesc("SarathTaskTC0001");
            taskCreate.saveTask();
            browser.sleep(4000);
            commons.multiselect();
//            taskSummary.taskSearch("Display Name","SarathtaskTC0001");
            commons.searchWithCriteria("Name","contains","SarathtaskTC0001");
            browser.sleep(2000);
            taskSummary.taskSelectGear("Delete");
            browser.sleep(2000);
             browser.get(taskUrl);
            commons.searchWithCriteria("Name","contains","SarathtaskTC0001");
            expect(commons.noResult()).toMatch('No results found.');
        });


        it('Create and Bulk task operations - TC0002', function(){
            browser.get(taskUrl);
            console.log("navigating to task screen");
            browser.sleep(5000);
            taskCreate.newTask();
            taskCreate.enterTaskRefName("SarathTaskTC0002_1");
            taskCreate.enterTaskName("SarathTaskTC0002_1");
            taskCreate.enterTaskStatus("Pending");
            taskCreate.enterTaskLabel("SarathTaskTC0002_1");
            taskCreate.enterTaskOwner("SarathTaskTC0002_1");
            taskCreate.enterTaskQueue("SarathTaskTC0002_1");
            taskCreate.enterTaskCreateDate("01/01/2020");
            taskCreate.enterTaskAssignDate("01/01/2020");
            taskCreate.enterTaskDueDate("01/01/2020");
            taskCreate.enterTaskDesc("SarathTaskTC0002_1");
            taskCreate.saveTask();
            browser.sleep(4000);
            taskCreate.newTask();
            taskCreate.enterTaskRefName("SarathTaskTC0002_2");
            taskCreate.enterTaskName("SarathTaskTC0002_2");
            taskCreate.enterTaskStatus("Pending");
            taskCreate.enterTaskLabel("SarathTaskTC0002_2");
            taskCreate.enterTaskOwner("SarathTaskTC0002_2");
            taskCreate.enterTaskQueue("SarathTaskTC0002_2");
            taskCreate.enterTaskCreateDate("01/01/2020");
            taskCreate.enterTaskAssignDate("01/01/2020");
            taskCreate.enterTaskDueDate("01/01/2020");
            taskCreate.enterTaskDesc("SarathTaskTC0002_2");
            taskCreate.saveTask();

            taskCreate.newTask();
            taskCreate.enterTaskRefName("SarathTaskTC0002_3");
            taskCreate.enterTaskName("SarathTaskTC0002_3");
            taskCreate.enterTaskStatus("Pending");
            taskCreate.enterTaskLabel("SarathTaskTC0002_3");
            taskCreate.enterTaskOwner("SarathTaskTC0002_3");
            taskCreate.enterTaskQueue("SarathTaskTC0002_3");
            taskCreate.enterTaskCreateDate("01/01/2020");
            taskCreate.enterTaskAssignDate("01/01/2020");
            taskCreate.enterTaskDueDate("01/01/2020");
            taskCreate.enterTaskDesc("SarathTaskTC0002_3");
            taskCreate.saveTask();

            browser.sleep(2000);
            commons.multiselect();
            taskSummary.taskSearch("Display Name","SarathTaskTC0002_");
            browser.sleep(2000);
            taskSummary.taskSelect("SarathTaskTC0002_1");
            taskSummary.taskSelect("SarathTaskTC0002_2");
            taskSummary.taskSelect("SarathTaskTC0002_3");

            taskSummary.taskMainGearSelect("Update","Pending");
            expect(taskSummary.getTaskStatus("1")).toEqual('PENDING');
            expect(taskSummary.getTaskStatus("2")).toEqual('PENDING');
            expect(taskSummary.getTaskStatus("3")).toEqual('PENDING');
            commons.refresh();


            taskSummary.taskSelect("SarathTaskTC0002_1");
            taskSummary.taskSelect("SarathTaskTC0002_2");
            taskSummary.taskSelect("SarathTaskTC0002_3");

            taskSummary.taskMainGearSelect("Delete","");
        });



})
