class Application < ApplicationRecord
  # Getters/Setters

  # Validations
  validates :company, :job_title, :user, :progress, presence: true

  #Associations
  belongs_to :user
  has_many :events, dependent: :destroy
  has_one :contact, dependent: :destroy

  #Methods
end
