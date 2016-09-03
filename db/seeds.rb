# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

20.times do
  Application.create(company: Faker::Company.name,
                     job_title: Faker::Company.profession,
                     progress: 'application',
                     user_id: 1);
end

Application.all.each do |app|
  Contact.create(fname: Faker::Name.first_name,
                 lname: Faker::Name.last_name,
                 phone: Faker::PhoneNumber.cell_phone,
                 email: Faker::Internet.email,
                 address: Faker::Address.street_address,
                 application_id: app.id)
end

50.times do
  Event.create(title: Faker::Company.name,
               date_time: Faker::Time.forward(23, :afternoon),
               notes: 'I am not ready for this',
               application_id: rand(10));
end
