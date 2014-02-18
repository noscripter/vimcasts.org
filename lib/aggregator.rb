module Middleman
  class Aggregator < Extension
    def initialize(app, options_hash={}, &block)
      super
    end
    helpers do
      def aggregate(blogs=[:episodes, :blog, :announcements])
        all_articles = blogs.map { |name| blog(name).articles }
        all_articles.flatten.sort_by(&:date).reverse
      end

      def aggregate_by_tag(tagname, blogs=[:episodes, :blog])
        tagged_articles = blogs.map { |name|
          blog(name).tags.fetch(tagname,[])
        }
        tagged_articles.flatten.sort_by(&:date).reverse
      end

      def minute_second(seconds)
        min, sec = *seconds.divmod(60)
        [min, sec.to_s.rjust(2, '0')].join(':')
      end
      def minute_second_datetime(seconds)
        min, sec = *seconds.divmod(60)
        sec = sec.to_s.rjust(2, '0')
        ["P#{min}M", "#{sec}S"].join(',')
      end
      def transcript_for_episode(number)
        "/transcripts/#{number}/en/"
      end
    end
  end
  ::Middleman::Extensions.register(:aggregator, Aggregator)
end

