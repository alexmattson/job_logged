# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'guest', password: 'password', created_at: 5.days.ago)
CoverLetter.create({user_id: User.find_by_username('guest').id,
                    cover_letter: "{\"company\":\"Comp Inc.\",\"opening\":{\"9878.624717137558\":\"Hello **COMPANY**,\",\"1575.8317174974757\":\"I am a software developer with a passion for creation, a drive for excellence, and an ability to lead. As a quick learner, I am able to adapt to many drastic changes and thrive in a fast paced goal oriented environment.  \\n\"},\"companyBlurb\":{},\"skill\":{\"3115.387143725137\":\"I have a passion for designing an experience for the user that is intuitive. Creating a site that the user can visit and know how to use everything, a site that balances beauty and functionality, and most importantly a site that the user loves. In my resent job application management project (‘Job Logged’, www.joblogged.com) I utilized Flexbox, CSS/SASS to build a Redux app that offers a smooth UI, an engaging UX, and a simple and elegant solution to the mass amounts of data that come with the job application process. \",\"2952.0243335568885\":\"An app that is not fast and functional is an app that will not retain users. Keeping this in the front of my mind, I have concentrated on optimizing applications as well as identifying and removing bottlenecks. Solving these backend problems was tackled successfully in my recent job application management project (‘Job Logged’, www.joblogged.com). This project was built with a Ruby on Rails backend, utilizing custom Active Record queries, hooked up to a PostgreSQL database, with particular emphasis on clean, simple, and optimized AJAX calls from the front-end and JSON responses from the back-end. \",\"3526.857959697167\":\"A great application requires a clean and intuitive user experience as well and the power and functionality to back it up. I write software across the full stack, in many different languages and frameworks, always seeking to accomplish those exact objectives. In my recent job application management project (‘Job Logged’, www.joblogged.com) I was able to utilize Flexbox, CSS/SASS to build a Redux app that offers a smooth UI and an engaging UX, with a Ruby on Rails backend, utilizing custom Active Record queries. This was all hooked up to a PostgreSQL database, with particular emphasis on clean, simple, and optimized AJAX and JSON from front-end and back-end respectively. I am excited to learn new languages and frameworks to add to my ever-expanding tool belt. \"},\"conclusion\":{\"971.9523801810049\":\"I look forward to taking the full set of skills that I have acquired and directly applying them to not only completing any project that **COMPANY** can throw at me, but to go above and beyond. I will continue to learn and grow with the company and I’m excited in contributing to the success you are creating. \",\"8888.072317822169\":\"Sincerely,\\n\\nGuest\"},\"signOff\":\"\",\"editing\":{\"opening\":null,\"companyBlurb\":null,\"skill\":null,\"conclusion\":null,\"signOff\":null},\"fullText\":\"\"}"})

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

title = ['Application Update',
         'Phone interview',
         'On-site Interview']
30.times do
  Event.create(title: title.sample,
               date_time: Faker::Time.forward(23, :afternoon),
               notes: 'I am not ready for this',
               application_id: rand(20));
end
