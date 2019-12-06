# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(username: 'Katie', password: '123456', email: 'katiepgray@gmail.com')


Vehicle.create!(title: "Heart Signal", image: "https://pbs.twimg.com/media/EEC-R_mXoAM5yhb.jpg", genre: "variety", language: "Chinese, Mandarin", user_id: 1)
Vehicle.create!(title: "My Hero Academia", image: "https://miro.medium.com/max/2000/0*OG4xw2lo-nTLRdEp.png", genre: "anime, action", language: "Japanese", user_id: 1)
Vehicle.create!(title: "Da Vinci Code", image: "https://sep.yimg.com/ay/hanbook/the-da-vinci-code-new-translation-2-volume-set-9.gif", genre: "drama", language: "Korean", user_id: 1)
Vehicle.create!(title: "This World's Spring", image: "https://images.squarespace-cdn.com/content/v1/571abd61e3214001fb3b9966/1575417828323-5D4978YUSZIL1970WVJH/ke17ZwdGBToddI8pDm48kLCynrWD3PmAifxoxfuWo-FZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFvOU2sOoIiSx-6GwRulfFODvEz_vdGElBzW_LmxyMZk4Xu2CAZEe6FrlxWPniHSxo/15_9784101369471.jpg?format=500w", genre: "drama", language: "Japanese", user_id: 1)

Flashcard.create!(vehicle_id: 1, vocab:"hi", vocab2: "hi", vocab3: "hi", description: "this is a test")

# puts "#{Vehicle.count} media created!"