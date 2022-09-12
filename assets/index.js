function changeDeleteUrl(id){
    console.log(id);
    var deleteLink = document.getElementById("deleting-link");
    deleteLink.setAttribute("href",`/deleteTask/?taskId=${id}`);
}