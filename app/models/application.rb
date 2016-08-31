class Application < ApplicationRecord
  # Getters/Setters

  # Validations
  validates :company, :job_title, :user, :progress, presence: true

  #Associations
  belongs_to :user

  #Methods
end
