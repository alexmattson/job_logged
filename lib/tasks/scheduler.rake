desc "This task is called by the Heroku scheduler add-on"

task :reset_guest => :environment do
  puts "Reseting guest user..."

  @user = User.find_by_username('guest')
  @user.delete()

  User.create(username: 'guest', password: 'password', created_at: 5.days.ago)

  progress = ['application',
              'application',
              'application',
              'phone',
              'on-site',
              'offer',
              'rejected']

  applications = []
  30.times do
    applications << Application.create(company: Faker::Company.name,
                                       job_title: Faker::Company.profession,
                                       progress: progress.sample,
                                       user_id: User.find_by_username('guest').id,
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

  title = {
      'application': 'Application Update',
      'phone': 'Phone interview',
      'on-site': 'On-site Interview'
    }
  notes = [
    'I am not ready for this',
    'need to review',
    "I'm excited about this one",
    'make sure to learn more about the company'
  ]
  30.times do
    type = title.keys.sample
    Event.create(title: title[type],
                 event_type: type.to_s,
                 date_time: Faker::Time.forward(23, :afternoon),
                 notes: notes.sample,
                 application_id: applications.sample.id);
  end

  puts "done."
end
