# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do
  Application.create(company: Faker::Company.name,
                     job_title: Faker::Company.profession,
                     progress: 'application',
                     user_id: 1);
end

50.times do
  Event.create(title: Faker::Company.name,
               date_time: Faker::Time.forward(23, :afternoon),
               notes: 'I am not ready for this',
               application_id: rand(10));
end
