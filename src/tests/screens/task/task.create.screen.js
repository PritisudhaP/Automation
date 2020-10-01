module.exports =function(){

    this.newTaskButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.taskRefNameEntryTextBox= element(by.xpath('//input[@name="refName"]'));
    this.taskNameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.taskStatusDropDown = element(by.xpath('//select[@name="status"]'));
    this.taskLabelEntryTextBox= element(by.xpath('//input[@name="label"]'));
    this.taskOwnerEntryTextBox= element(by.xpath('//input[@name="owner"]'));
    this.taskQueueNameEntryTextBox= element(by.xpath('//input[@name="taskQueueRefName"]'));
    this.taskCreateDateEntryTextBox= element(by.xpath('//input[@name="dateCreated"]'));
    this.taskAssignDateEntryTextBox= element(by.xpath('//input[@name="assignmentDate"]'));
    this.taskDueDateEntryTextBox= element(by.xpath('//input[@name="dueDate"]'));
   
    this.taskDescEntryTextBox= element(by.xpath('//pre/textarea[contains(@class,"ace_text-input")]'));

    this.saveButton = element(by.xpath('//button[contains(text(),"Create Task")]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.newTask = function() {
        return this.newTaskButton.click();
    }

    this.enterTaskRefName = function(refName) {
        return this.taskRefNameEntryTextBox.sendKeys(refName);
    }
    
    this.enterTaskName = function(name) {
        return this.taskNameEntryTextBox.sendKeys(name);
    }
    
    this.enterTaskStatus = function(status) {
        commons.selectOption(this.taskStatusDropDown,status);
    }

    this.enterTaskLabel = function(label) {
        return this.taskLabelEntryTextBox.sendKeys(label);
    }

    this.enterTaskOwner = function(owner) {
        return this.taskOwnerEntryTextBox.sendKeys(owner);
    }

    this.enterTaskQueue = function(queue) {
        return this.taskQueueNameEntryTextBox.sendKeys(queue);
    }

    this.enterTaskCreateDate = function(createDate) {
        this.taskCreateDateEntryTextBox.clear();
        return this.taskCreateDateEntryTextBox.sendKeys(createDate);
    }

    this.enterTaskAssignDate = function(assignDate) {
        this.taskAssignDateEntryTextBox.clear();
        return this.taskAssignDateEntryTextBox.sendKeys(assignDate);
    }

    this.enterTaskDueDate = function(dueDate) {
        this.taskDueDateEntryTextBox.clear();
        return this.taskDueDateEntryTextBox.sendKeys(dueDate);
    }

    this.enterTaskDesc = function(desc) {
        return this.taskDescEntryTextBox.sendKeys(desc);
    }

    this.saveTask = function() {
        return this.saveButton.click();
    }
}

