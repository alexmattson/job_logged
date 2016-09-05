json.extract! application,
  :id, :company, :job_title, :progress, :user_id, :created_at

if application.contact
  json.contact do
    json.fname application.contact.fname
    json.lname application.contact.lname
    json.phone application.contact.phone
    json.email application.contact.email
    json.address application.contact.address
    json.id application.contact.id
  end
end
