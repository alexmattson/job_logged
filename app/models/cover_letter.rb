class CoverLetter < ApplicationRecord
  validates :user, :cover_letter, presence: true
  validates :user, uniqueness: true

  belongs_to :user

  def self.default
    state = '{"company":"",
             "opening":{},
             "companyBlurb":{},
             "skill":{},
             "conclusion":{},
             "signOff":"",
             "editing":{"opening": null,"companyBlurb": null,"skill": null,"conclusion": null,"signOff": null},
             "fullText":""}'
  end
end
