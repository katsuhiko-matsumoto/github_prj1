
usercol
		.begin()
		.findOne({id:id,password:passmd5}, function(user){
			if(user){
                //todo
            }
        })
        .failure(function(err){
									
		})
		.end();

usercol
		.begin()
		.insert(insertdata)
		.success(function(){
               //todo
        })
        .failure(function(err){
									
		})
        .end();

usercol
		.begin()
		.update({_id:data._id},{$set:data})
		.success(function(){
                //todo
		})
		.failure(function(err){

		})
        .end();

