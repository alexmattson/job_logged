class Event < ApplicationRecord
  # Getters/Setters

  # Validations
  validates :title, :date_time, :application, presence: true

  #Associations
  belongs_to :application

  #Methods

  def self.by_month(month)
    year = Time.now.year
    end_month = Date.new(year, month + 2, 1)
    start_month = Date.new(year, month, - 1)

    self.where("date_time > ?", start_month)
        .where("date_time < ?", end_month)
  end
end
