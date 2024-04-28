
const PROJECT_STATUS = {
    ON_TRACK:'on_track',
    AT_RISK:'at_risk',
    OFF_TRACK:'off_track',
    DONE:'done'
}
const PROJECT_COMPLETION = {
    PENDING:'pending',
    IN_PROGRESS:'in_progress',
    DONE:'done',
    CANCELLED:'cancelled'
}

const PROJECT_SORT_BY ={
    NEWEST_FIRST : 'newest',
    OLDEST_FIRST : 'oldest',
    ASCENDING : 'a-z',
    DESCENDING: 'z-a'
}

const TASK_STATUS = {
    FOR_APPROVAL:'for_approval',
    IN_PROGRESS:'in_progress',
    APPROVED:'approved',
    COMPLETED:'completed',
    CANCELLED:'cancelled'}

const TASK_SORT_BY ={
    NEWEST_FIRST : 'newest',
    OLDEST_FIRST : 'oldest',
    ASCENDING : 'a-z',
    DESCENDING: 'z-a'
}
const TASK_PRIORITY ={
    TOP : 1,
    MID : 2,
    LOW : 3,
}
const USER_SORT_BY ={
    NEWEST_FIRST : 'newest',
    OLDEST_FIRST : 'oldest',
    ASCENDING : 'a-z',
    DESCENDING: 'z-a'
}
const USER_ROLE ={
    ADMIN : 'admin',
    USER : 'user',
}

module.exports = {
    PROJECT_STATUS,
    PROJECT_COMPLETION,
    PROJECT_SORT_BY,
    TASK_SORT_BY,
    TASK_STATUS,
    TASK_PRIORITY,
    USER_SORT_BY,
    USER_ROLE
}