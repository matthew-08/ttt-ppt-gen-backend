const database = {
    users: {
        createUser() {
            return {
                id: '',
                email: '',
            }
        },
        deleteUser() {},
        editUser() {},
        updateUser() {},
        getUser() {},
    },
    ppt: {
        pptGenerate() {},
        pptEdit() {},
    },
    userPptOutline: {
        pptOutlineCreate() {},
        pptOutlineDelete() {},
        pptOutlineEdit() {},
        pptOutlineGet() {},
    },
}

export default database
