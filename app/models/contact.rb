class Contact < ApplicationRecord
  # Getters/Setters

  # Validations
  validates :application
  validate :at_least_one_value

  def at_least_one_value
    if fname.present? ||
       lname.present? ||
       phone.present? ||
       email.present? ||
       address.present?
    else
      errors.add(:contanct, 'needs at least one field filled in')
    end
  end

  #Associations
  belongs_to :application

  #Methods


end
