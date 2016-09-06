# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'guest', password: 'password', created_at: 5.days.ago)

progress = ['application',
            'application',
            'application',
            'phone',
            'on-site',
            'offer',
            'rejected']
30.times do
  Application.create(company: Faker::Company.name,
                     job_title: Faker::Company.profession,
                     progress: progress.sample,
                     user_id: 1,
                     created_at: Faker::Date.between(5.days.ago, Date.today));
end

Application.all.each do |app|
  Contact.create(fname: Faker::Name.first_name,
                 lname: Faker::Name.last_name,
                 phone: Faker::PhoneNumber.cell_phone,
                 email: Faker::Internet.email,
                 address: '160 Spear St. San Francisco, CA',
                 application_id: app.id)
end

title = ['Application Update',
         'Phone interview',
         'On-site Interview']
30.times do
  Event.create(title: title.sample,
               date_time: Faker::Time.forward(23, :afternoon),
               notes: 'I am not ready for this',
               application_id: rand(20));
end
